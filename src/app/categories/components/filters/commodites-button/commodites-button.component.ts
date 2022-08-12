import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-commodites-button',
  templateUrl: './commodites-button.component.html',
  styleUrls: ['./commodites-button.component.scss']
})
export class CommoditesButtonComponent {
  clicked = false;
  @Input() buttonName: string | undefined;

  changeButtonCss() {
    if (this.clicked) this.clicked = false;
    else this.clicked = true;
  }
  onValueSelector(_value: string) {
    if (this.clicked) this.clicked = false;
    else this.clicked = true;
  }
}
