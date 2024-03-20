import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {


  constructor(
    private location: Location,
   
  ) { }



  cancel(): void {
    this.location.back();
  }

}
