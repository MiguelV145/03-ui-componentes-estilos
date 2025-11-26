import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeSwitcher } from "../../../share/componet/theme-switcher/theme-switcher";

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterLinkActive, ThemeSwitcher],
  templateUrl: './Drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer { }
