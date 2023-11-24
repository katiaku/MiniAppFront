import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  student: Student;
  students: Student[];

  private url = "http://localhost:3000/students";

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Object> {
    return this.http.get(this.url);
  }

  public getOne(student_id: number): Observable<Object> {
    return this.http.get(`${this.url}?student_id=${student_id}`);
  }

  public add(student: Student): Observable<Object> {
    return this.http.post(this.url, student);
  }

  public edit(student: Student): Observable<Object> {
    return this.http.put(this.url, student);
  }

  public delete(student: Student): Observable<Object> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: student
    };

    return this.http.delete(this.url, options);
  }

}
