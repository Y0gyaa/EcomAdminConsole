import { Component, OnInit, inject, ViewChild } from "@angular/core";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
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
import {
  ProductBackend,
  ProductBackendService,
  Backend,
} from "../backend.service";
import { DialogBox } from "../dialog/dialog.component";
import { SingleDialog } from "../single-dialog/single-dialog.component";

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
  selectedItems: [] = [];
  dialog = inject(MatDialog);
  private subscription: Subscription;
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

  openDialog(id: number) {
    this.backendService.updateProductID(id);
    this.dialog.open(DialogBox, {
      data: { entry_type: "Edit", btn_txt: "Update" },
    });
    this.loadProduct();
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
