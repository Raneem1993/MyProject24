import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/students';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl);
  }

  getOne(id: string): Observable<Student>{
    return this.http.get<Student>(this.baseUrl + '/' + id);
  }

  update(id: string, data: Student): Observable<Student> {
    return this.http.patch<Student>(this.baseUrl + '/' + id, data);
  }

  create(student:Student){
    return this.http.post<Student>(this.baseUrl, student);
  }

  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }
}
