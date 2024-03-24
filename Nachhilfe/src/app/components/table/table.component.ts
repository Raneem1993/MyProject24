import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/shared/backend.service';
import { Student } from 'src/app/shared/student';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  students!: Student[];
  deleted = false;

  constructor(private bs: BackendService, private router: Router) { }


  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
          {
            next: (response) => {
                  this.students = response;
                  console.log(this.students);
                  return this.students;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAll() completed')
          })
        }

  delete(id: string): void {
    this.bs.deleteOne(id).subscribe(
      {
        next: (response: any) => {
          console.log('response : ', response);
          if(response.status == 204){
                  console.log(response.status);
                  this.reload(true);
                } else {
                  console.log(response.status);
                  console.log(response.error);
                  this.reload(false);
                }
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
    });
  }

  reload(deleted: boolean)
  {
    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/table');
  }

  changeRoute(){
    this.router.navigateByUrl('/startseite');
  }

}
