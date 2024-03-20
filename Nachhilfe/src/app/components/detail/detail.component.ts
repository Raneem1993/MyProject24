import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    firstname : new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    kurse: new FormControl('', [Validators.required]),
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
                  firstname: this.student?.firstname,
                  lastname: this.student?.lastname,
                  email: this.student?.email,
                  address: this.student?.address,
                  

                })
                return this.student;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });
  }

  update(): void {
    const values = this.form.value;
    this.student.firstname = values.firstname!;
    this.student.lastname = values.lastname!;
    this.student.email = values.email!;
    this.student.address = values.address!;
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

