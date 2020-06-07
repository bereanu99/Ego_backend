import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    public apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient, private router: Router
    ) {
    }

    public getUserInfo(id: string) {
        return this.http.get<any>(this.apiUrl + 'user/' + id);
    }


    public getCarInfo(id: string) {
        return this.http.get<any>(this.apiUrl + 'car/' + id);
    }
}
