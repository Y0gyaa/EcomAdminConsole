import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SelectionService } from "../selection.service";

@Component({
  selector: "btn-group",
  imports: [MatButtonModule, MatIconModule],
  templateUrl: "./btn-group.component.html",
  styleUrl: "./btn-group.component.css",
})
export class BtnGroupComponent {
  isAllSelected = false;
  constructor(private selectionService: SelectionService) {
    this.selectionService.isAllSelected$.subscribe((state) => {
      this.isAllSelected = state;
    });
  }

  toggleAll() {
    this.isAllSelected = !this.isAllSelected;
    this.selectionService.toggleSelectAll(this.isAllSelected);
  }
  addNew() {
    this.selectionService.addNewProduct();
  }
}
