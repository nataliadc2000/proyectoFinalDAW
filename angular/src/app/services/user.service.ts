import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./usuario";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users';

    constructor(private http:HttpClient){}
    login(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, user);
      }
    
      createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
      }

}