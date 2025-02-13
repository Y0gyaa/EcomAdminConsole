import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ProductBackendService, Backend, ProductNEW } from "../backend.service";

@Component({
  selector: "dialog-box",
  standalone: true,
  templateUrl: "./dialog.component.html",
  styleUrl: "./dialog.component.css",
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
  fileName: string = "";
  selectedFiles: File | null = null;
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
    if (input.files?.length) {
      this.selectedFiles = input.files[0];
    }
  }
  updateProduct(formData: FormData, id: number) {
    if (this.selectedFiles) {
      const fD = new FormData();
      fD.append("file", this.selectedFiles);
      this.backendService.uploadImage(fD).subscribe((filename: Object) => {
        const fStr = JSON.stringify(filename);
        this.fileName = fStr.split(":")[1].slice(1, -2);
      });
    }
    setTimeout(() => {
      const formObj: Backend = {
        id: id,
        product_name: formData.get("product_name") as string,
        sku: formData.get("sku") as string,
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        images: ["http://localhost:3000/uploads/" + this.fileName],
      };
      this.backendService.updateProduct(formObj).subscribe();
    }, 9000);
  }
  addProduct(formData: FormData) {
    if (this.selectedFiles) {
      const fD = new FormData();
      fD.append("file", this.selectedFiles);
      this.backendService.uploadImage(fD).subscribe((filename: Object) => {
        const fStr = JSON.stringify(filename);
        this.fileName = fStr.split(":")[1].slice(1, -2);
      });
    }
    setTimeout(() => {
      const formObj: ProductNEW = {
        product_name: formData.get("product_name") as string,
        sku: formData.get("sku") as string,
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        images: ["http://localhost:3000/uploads/" + this.fileName],
      };

      this.backendService.addProduct(formObj).subscribe();
    }, 9000);
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

      if (entry_type === "New") {
        this.addProduct(formData);
      } else {
        var id = this.backendService.getProductID();
        this.updateProduct(formData, id);
      }
    }
  }
}
