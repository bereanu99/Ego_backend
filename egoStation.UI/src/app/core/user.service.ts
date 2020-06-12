import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Car } from '../features/car/car.component';
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

    public postUserInfo(id: string, userEntity: any) {
        return this.http.put<any>(this.apiUrl + 'user/' + id, userEntity);
    }

    public getCarInfo(id: string) {
        return this.http.get<any>(this.apiUrl + 'car/' + id);
    }

    public saveCarInfo(car: Car) {
        return this.http.put<any>(this.apiUrl + 'car', car);
    }

    public deleteCarInfo(id: string) {
        return this.http.delete<any>(this.apiUrl + 'car/' + id);
    }
}
