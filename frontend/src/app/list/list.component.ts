import { Component, OnInit, inject, ViewChild } from "@angular/core";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectionService } from "../selection.service";
import { Subscription } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  ProductBackend,
  ProductBackendService,
  Backend,
} from "../backend.service";

export interface DialogData {
  edit: "name" | "sku" | "price" | "stock" | "images";
}

@Component({
  selector: "list",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  products: ProductBackend[] = [];
  displayedColumns: string[] = [
    "selected",
    "images",
    "product_name",
    "sku",
    "price",
    "stock",
    "edit",
  ];
  dataSource = new MatTableDataSource<ProductBackend>([
    {
      selected: false,
      id: 1,
      images: ["https://material.angular.io/assets/img/examples/shiba2.jpg"],
      product_name: "Product 1",
      sku: "SKU001",
      price: 99.99,
      stock: 50,
      edit: "",
    },
    {
      selected: false,
      id: 2,
      images: ["https://material.angular.io/assets/img/examples/shiba2.jpg"],
      product_name: "Product 2",
      sku: "SKU002",
      price: 149.99,
      stock: 30,
      edit: "",
    },
    // test data when api not connected
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private backendService = inject(ProductBackendService);
  constructor(public selectionService: SelectionService) {
    this.subscription = this.selectionService.actionTriggered$.subscribe(() => {
      this.addNewProduct();
    });
  }
  ngOnInit() {
    this.loadProduct();
    this.dataSource.paginator = this.paginator;

    this.selectionService.isAllSelected$.subscribe((state) => {
      this.dataSource.data.forEach((item) => (item.selected = state));
    });

    this.selectionService.selectedItems$.subscribe((selectedItems) => {
      this.dataSource.data.forEach((item) => {
        if (selectedItems[item.id] !== undefined) {
          item.selected = selectedItems[item.id];
        }
      });
    });
  }
  loadProduct() {
    this.backendService
      .getProducts()
      .subscribe(
        (product) =>
          (this.dataSource = new MatTableDataSource<ProductBackend>(
            this.transform(product),
          )),
      );
  }
  transform(
    product: Backend[],
  ): (ProductBackend & { selected: boolean; edit: string })[] {
    return product.map((prod) => ({ ...prod, selected: false, edit: "" }));
  }

  deleteID(id: number) {
    this.backendService.deleteProduct(id).subscribe(() => this.loadProduct());
  }
  updateSelection(item: ProductBackend) {
    this.selectionService.updateSelection(item.id, !!item.selected);
  }

  addNewProduct() {
    this.dialog.open(DialogBox, {
      data: { entry_type: "New", btn_txt: "Add" },
    });
    this.loadProduct();
  }

  dialog = inject(MatDialog);
  private subscription: Subscription;

  openDialog(id: number) {
    this.backendService.updateProductID(id);
    this.dialog.open(DialogBox, {
      data: { entry_type: "Edit", btn_txt: "Update" },
    });
  }
  openEditSingleEntry(e: string, id: number) {
    this.backendService.updateProductID(id);
    this.dialog.open(SingleDialog, {
      data: {
        edit: e,
      },
    });
    this.loadProduct();
  }
}

@Component({
  selector: "dialog-box",
  standalone: true,
  templateUrl: "./dialog-box.html",
  styleUrl: "./dialog-box.css",
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class DialogBox {
  data = inject(MAT_DIALOG_DATA);
  private backendService = inject(ProductBackendService);
  productForm: FormGroup;
  selectedImages: File | null = null;
  filePath: string = "";
  selectedFiles: string[] = [];
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      product_name: ["", Validators.required],
      sku: ["", Validators.required],
      price: [
        "",
        [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")],
      ],
      stock: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      images: [null],
    });
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImages = input.files[0];
      var e: number = input.files.length;
      Array.from(input.files).forEach((file) => {
        this.filePath = file.name;
        this.selectedFiles.push(file.name);
      });
    }
  }
  updateProduct(formData: FormData, id: number) {
    const formObj: Backend = {
      id: id,
      product_name: formData.get("product_name") as string,
      sku: formData.get("sku") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      images: this.selectedFiles,
    };
    this.backendService.updateProduct(formObj).subscribe();
  }
  addProduct(formData: FormData) {
    const formObj: Backend = {
      id: Math.floor(Math.random() * (400 - 4 + 1)) + 4,
      product_name: formData.get("product_name") as string,
      sku: formData.get("sku") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      images: [formData.get("images") as string],
    };
    this.backendService.uploadImage(this.selectedFiles).subscribe();
    this.backendService.addProduct(formObj).subscribe();
  }
  onSubmit(entry_type: string) {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append(
        "product_name",
        this.productForm.get("product_name")?.value,
      );
      formData.append("sku", this.productForm.get("sku")?.value);
      formData.append("price", this.productForm.get("price")?.value);
      formData.append("stock", this.productForm.get("stock")?.value);
      formData.append("image", this.filePath);
      if (entry_type === "New") {
        this.addProduct(formData);
      } else {
        var id = this.backendService.getProductID();
        this.updateProduct(formData, id);
      }
    }
  }
}

@Component({
  selector: "single-dialog-box",
  standalone: true,
  templateUrl: "./single-dialog-box.html",
  styleUrl: "./dialog-box.css",
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class SingleDialog {
  data = inject(MAT_DIALOG_DATA);
  singleForm: FormGroup;
  selectedImages: File | null = null;
  filePath: string = "";
  selectedFiles: string[] = [];
  private backendService = inject(ProductBackendService);
  constructor(private fb: FormBuilder) {
    this.singleForm = this.fb.group({
      name: [""],
      sku: [""],
      price: [
        "",
        [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")],
      ],
      stock: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      images: [null],
    });
  }
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImages = input.files[0];
      var e: number = input.files.length;
      Array.from(input.files).forEach((file) => {
        this.filePath = file.name;
        this.selectedFiles.push(file.name);
      });
    }
  }
  updateProduct(id: number, field: string, value: any) {
    this.backendService.updateProductField(id, field, value).subscribe();
  }
  onSingleSubmit() {
    if (this.singleForm.valid) {
      var p_id = this.backendService.getProductID();
      let updated_var;
      let value;
      const formData = new FormData();
      if (this.singleForm.get("product_name")?.value) {
        value = this.singleForm.get("product_name")?.value;
        updated_var = "product_name";
      }
      if (this.singleForm.get("sku")?.value) {
        value = this.singleForm.get("sku")?.value;
        updated_var = "sku";
      }
      if (this.singleForm.get("price")?.value) {
        value = this.singleForm.get("price")?.value;
        updated_var = "price";
      }
      if (this.singleForm.get("stock")?.value) {
        value = this.singleForm.get("stock")?.value;
        updated_var = "stock";
      }
      if (this.selectedImages) {
        value = this.filePath;
        updated_var = "images";
      }
      if (updated_var) {
        this.updateProduct(p_id, updated_var, value);
      }
    }
  }
}
