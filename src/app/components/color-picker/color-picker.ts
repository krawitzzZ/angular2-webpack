import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.html',
  styleUrls: ['./color-picker.css']
})
export class ColorPicker {
  @Input() colors: Array<string> = [];
  @Output() selectedColor = new EventEmitter();
  isPickerOpen: boolean = false;

  openPicker() {
    this.isPickerOpen = true;
  }

  selectColor(color) {
    this.selectedColor.next(color);
    this.isPickerOpen = false;
  }
}
