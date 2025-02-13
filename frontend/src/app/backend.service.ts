import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ProductNEW {
  product_name: string;
  sku: string;
  price: number;
  stock: number;
  images: string[];
}

export interface Backend {
  id: number;
  product_name: string;
  sku: string;
  price: number;
  stock: number;
  images: string[];
}

export interface ProductBackend extends Backend {
  selected: boolean;
  edit: string;
}

@Injectable({
  providedIn: "root",
})
export class ProductBackendService {
  apiUrl = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductBackend[]> {
    return this.http.get<ProductBackend[]>(this.apiUrl, {
      headers: { Accept: "application/json" },
    });
  }

  addProduct(product: ProductNEW): Observable<ProductNEW> {
    return this.http.post<ProductNEW>(this.apiUrl, product);
  }

  uploadImage(file: FormData) {
    return this.http.post<{ filePath: string }>(
      "http://localhost:3000/products/uploads/",
      file,
    );
  }
  getAllIds() {
    return this.http.get(`${this.apiUrl}/all`, {
      headers: { Accept: "application/json" },
    });
  }
  updateProduct(product: Backend): Observable<Backend> {
    return this.http.put<Backend>(`${this.apiUrl}/${product.id}`, product);
  }
  current_id = 9999999;

  updateProductID(id: number) {
    this.current_id = id;
  }
  updateProductField(id: number, field: string, value: any) {
    return this.http.put(`${this.apiUrl}/${id}/${field}`, { field, value });
  }

  getProductID() {
    return this.current_id;
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
