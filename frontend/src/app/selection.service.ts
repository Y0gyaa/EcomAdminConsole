import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ProductBackendService } from "./backend.service";

@Injectable({
  providedIn: "root",
})
export class SelectionService {
  private isAllSelectedSubject = new BehaviorSubject<boolean>(false);
  isAllSelected$ = this.isAllSelectedSubject.asObservable();
  checked: string[] = [];
  ids: string = "";
  private selectedItemsSubject = new BehaviorSubject<{ [id: number]: boolean }>(
    {},
  );
  selectedItems$ = this.selectedItemsSubject.asObservable();
  constructor(private backendService: ProductBackendService) {}

  toggleSelectAll(state: boolean) {
    this.isAllSelectedSubject.next(state);
    this.backendService.getAllIds().subscribe((res) => {
      this.ids = JSON.stringify(res);
    });
    const numbers = this.ids.match(/\d+/g);
    this.checked = numbers ? numbers.map(String) : [];
  }

  updateSelection(id: number, state: boolean) {
    const currentSelection = this.selectedItemsSubject.value;
    currentSelection[id] = state;
    this.selectedItemsSubject.next({ ...currentSelection });

    // Check if all items are selected
    const allSelected = Object.values(currentSelection).every(
      (selected) => selected,
    );
    this.isAllSelectedSubject.next(allSelected);
    this.checkExisting(id, state);
  }
  private checkExisting(a: number, state: boolean) {
    if (this.checked.includes(a.toString())) {
      const index = this.checked.indexOf(a.toString());
      if (index > -1) {
        this.checked.splice(index, 1);
      }
    } else {
      this.checked.push(a.toString());
    }
  }
  private actionTriggered = new Subject<void>();
  actionTriggered$ = this.actionTriggered.asObservable();
  addNewProduct() {
    this.actionTriggered.next();
  }
  deleteSelected() {
    this.checked.forEach((item) => {
      this.backendService.deleteProduct(parseInt(item));
    });
  }
}
