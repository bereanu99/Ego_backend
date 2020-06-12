import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = environment.apiUrl;
    private userId: string;

    constructor(private http: HttpClient, private router: Router) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.userId = currentUser.id;
        }
    }

    public login(email: string, password: string) {
        return this.http.post<any>(this.apiUrl + 'user/auth', { email, password })
            .pipe(
                tap(
                    (user) => {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('userid', JSON.stringify(user.userId));
                        localStorage.setItem('carid', JSON.stringify(user.carId));
                        this.userId = user.id;
                    })
            );
    }

    public register(firstName: string, lastName: string, email: string, password: string) {
        console.log(firstName, lastName, email, password );
        return this.http.post<any>(this.apiUrl + 'user/register', { firstName, lastName , email, password });
    }
    public meme() {
        return this.http.get<any>(this.apiUrl + `user`);
    }

    public logout() {
        localStorage.clear();
    }

    public get UserId() {
        return this.userId;
    }

    public get Username() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser.username;
    }

}
