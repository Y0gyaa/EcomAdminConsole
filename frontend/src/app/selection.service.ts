import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SelectionService {
  private isAllSelectedSubject = new BehaviorSubject<boolean>(false);
  isAllSelected$ = this.isAllSelectedSubject.asObservable();

  private selectedItemsSubject = new BehaviorSubject<{ [id: number]: boolean }>(
    {},
  );
  selectedItems$ = this.selectedItemsSubject.asObservable();

  toggleSelectAll(state: boolean) {
    this.isAllSelectedSubject.next(state);
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
  }
  private actionTriggered = new Subject<void>();
  actionTriggered$ = this.actionTriggered.asObservable();
  addNewProduct() {
    this.actionTriggered.next();
  }
}
