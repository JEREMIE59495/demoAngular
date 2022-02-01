import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  filter: any;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.URL}/users`);
  }

  getById(id: string): Observable<User> {
     return this.http.get<User>(`${environment.URL}/users/${id}`)
  }

   put(user: User): Observable<User> {
    return this.http.put<User>(`${environment.URL}/users/${user.id}`,user);
  }

   delete(id:string) {
    return this.http.delete(`${environment.URL}/users/${id}`);
   }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.URL}/users`, user);
  }
}
