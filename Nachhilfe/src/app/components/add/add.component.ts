import { Component, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl,Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/shared/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  {

  closeResult = '';


constructor(
  private modalService :NgbModal,
  private bs: BackendService,
  private router: Router,
  private location: Location,
  ){}


  firstnameFC = new FormControl('', [Validators.required]);
  lastnameFC = new FormControl('', [Validators.required]);
  emailFC = new FormControl('', [Validators.required, Validators.email]);
  addressFC = new FormControl('', [Validators.required]);
  kurseFC = new FormControl('', [Validators.required]);




  private formValid() {
    return this.firstnameFC.valid && this.lastnameFC.valid && this.emailFC.valid && this.addressFC.valid  && this.kurseFC.valid;
  }

  student(content: TemplateRef<any>) {

    if(this.formValid())
    {
      let student = {
        _id :'',
        firstname:this.firstnameFC.value!,
        lastname: this.lastnameFC.value!,
        email: this.emailFC.value!,
        address: this.addressFC.value!,
        kurse:[this.kurseFC.value!]

      }

      this.bs.createNewStudent(student).subscribe({
          next: (response) => console.log('response', response),
          error: (err) => console.log(err),
          complete: () => console.log('register completed')
      });

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.router.navigate(['/table']);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );

      console.log('new student: ', student)
    }
    else
    {
      console.warn('form still invalid!')
    }
  }

  cancel() :void{
    this.location.back();

  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}

















