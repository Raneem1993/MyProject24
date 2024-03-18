import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { Student } from 'src/app/shared/student';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string = '';
  student!: Student;
  form = new FormGroup({
    firstnameControl : new FormControl<String>(''),
    lastnameControl: new FormControl<String>(''),
    emailControl: new FormControl<String>(''),
    addressControl: new FormControl<String>(''),
    kurseControl: new FormControl<[String]>(['']),
});


  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
    this.bs.getOne(id).subscribe(
    {
      next: (response: Student) => {
              this.student = response;
              console.log('student',this.student);
              this.form.patchValue({
                firstnameControl: this.student?.firstname,
                lastnameControl: this.student?.lastname,
                emailControl: this.student?.email,
                addressControl: this.student?.address,
                kurseControl:this.student?.kurse,
              })
              return this.student;
      },
      error: (err) => console.log(err),
      complete: () => console.log('getOne() completed')
    });
}

update(): void {
  const values = this.form.value;
    this.student.firstname = values.firstnameControl!;
    this.student.lastname = values.lastnameControl!;
    this.student.email = values.emailControl!;
    this.student.address = values.addressControl!;
    this.student.kurse = values.kurseControl!;
    this.bs.update(this.id, this.student)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log(response._id);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('update() completed')
      }
      );
    this.router.navigateByUrl('/table');

}

cancel(): void {
  this.location.back();
}



}
