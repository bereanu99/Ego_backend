import { Directions } from './../features/map/map.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class StationService {

    constructor(private http: HttpClient) {}
    public apiUrl: string = environment.apiUrl;

    public googleApiTest = 'http://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyA7N7PK0olNEkLval3s18qrKhONNS4tb68';

    public getStations() {
        return this.http.get<any>(this.apiUrl + 'station');
    }

    public getStationById(id: string) {
        return this.http.get<any>(this.apiUrl + 'station' + id);
    }

    public postStation(station: any){
        return this.http.post<any>(this.apiUrl + 'station', station);
    }

    public updateStation(id: string, station: any){
        return this.http.post<any>(this.apiUrl + 'station' + id, station);
    }

    public directions() {
        return this.http.get<any>(this.googleApiTest);
    }

    public directions2(directions: Directions) {
        return this.http.post<any>(this.apiUrl + 'directions', directions);
    }
}
