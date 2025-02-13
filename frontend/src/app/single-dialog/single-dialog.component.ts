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
import {
  ProductBackend,
  ProductBackendService,
  Backend,
  ProductNEW,
} from "../backend.service";

@Component({
  selector: "single-dialog-box",
  standalone: true,
  templateUrl: "./single-dialog.component.html",
  styleUrl: "./single-dialog.component.css",
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
  fileName: string = "";
  selectedFiles: File | null = null;
  private backendService = inject(ProductBackendService);
  constructor(private fb: FormBuilder) {
    this.singleForm = this.fb.group({
      product_name: [""],
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
    if (input.files?.length) {
      this.selectedFiles = input.files[0];
    }
  }
  updateProduct(id: number, field: string, value: any) {
    this.backendService.updateProductField(id, field, value).subscribe(() => {
      console.log(id, field, value);
    });
  }
  onSingleSubmit() {
    var p_id = this.backendService.getProductID();
    let updated_var;
    let value;
    const formData = new FormData();
    if (this.singleForm.get("product_name")?.value) {
      value = this.singleForm.get("product_name")?.value;
      updated_var = "product_name";
      this.updateProduct(p_id, updated_var, value);
    }
    if (this.singleForm.get("sku")?.value) {
      value = this.singleForm.get("sku")?.value;
      updated_var = "sku";
      this.updateProduct(p_id, updated_var, value);
    }
    if (this.singleForm.get("price")?.value) {
      value = this.singleForm.get("price")?.value;
      updated_var = "price";
      this.updateProduct(p_id, updated_var, value);
    }
    if (this.singleForm.get("stock")?.value) {
      value = this.singleForm.get("stock")?.value;
      updated_var = "stock";
      this.updateProduct(p_id, updated_var, value);
    }
    if (this.singleForm.get("images")?.value && this.selectedFiles) {
      const fD = new FormData();
      fD.append("file", this.selectedFiles);
      this.backendService.uploadImage(fD).subscribe((filename: Object) => {
        const fStr = JSON.stringify(filename);
        this.fileName = fStr.split(":")[1].slice(1, -2);
      });
      setTimeout(() => {
        this.updateProduct(
          p_id,
          "images",
          "http://localhost:3000/uploads/" + this.fileName,
        ),
          9000;
      });
    }
  }
}
