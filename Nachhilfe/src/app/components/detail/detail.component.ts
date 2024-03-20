import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { Student } from '../../shared/student';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string = '';
  student!: Student;
    form = new FormGroup({
    firstnameControl : new FormControl<string>(''),
    lastnameControl: new FormControl<string>(''),
    emailControl: new FormControl<string>(''),
    addressControl: new FormControl<string>(''),
    kurseControl: new FormControl<[string]>(['']),
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
                  kurseControl: this.student?.kurse,

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

