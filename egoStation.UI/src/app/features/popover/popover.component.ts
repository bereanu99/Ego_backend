import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface PopoverResponse {
    rezervation: boolean;
    directions: boolean;
    data: any;
}
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
    public localData = this.data;
    constructor(
        public dialogRef: MatDialogRef<PopoverComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit() {
      console.log(this.data);
  }

  public rezStation() {
      const response: PopoverResponse = {
          rezervation: true,
          directions: false,
          data: this.localData
      };
      this.dialogRef.close(response);
  }

  public getDirection() {
      const response: PopoverResponse = {
          rezervation: false,
          directions: true,
          data: this.localData
      };
      this.dialogRef.close(response);
  }

}
