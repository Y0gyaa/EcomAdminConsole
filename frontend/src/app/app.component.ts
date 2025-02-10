import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { BtnGroupComponent } from "./btn-group/btn-group.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ListComponent, BtnGroupComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "ecom-admin-panel";
}
