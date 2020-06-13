import { StationService } from './../../core/station.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { AgmMap, LatLngBoundsLiteral, AgmMarker } from '@agm/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopoverComponent } from '../popover/popover.component';

export interface Directions {
    origin: string;
    destination: string;
}
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
    @ViewChild('AgmMap') agmMap: AgmMap;
    origin: { lat: number; lng: number; };
    destination: { lat: number; lng: number; };

    constructor(
        private readonly stationService: StationService,
        private readonly dialog: MatDialog
    ) { }

    public latitude = 44.3854;
    public longitude = 26.1075978;
    public markers;
    public bounds!: LatLngBoundsLiteral;
    public route!: any;
    public routeOverview!: any;

    public styles = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f5f5f5'
                }
            ]
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161'
                }
            ]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#f5f5f5'
                }
            ]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#bdbdbd'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575'
                }
            ]
        },
        {
            featureType: 'poi.business',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#c1e4b4'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dadada'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161'
                }
            ]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        },
        {
            featureType: 'transit',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5'
                }
            ]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#c9c9c9'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#afcbe4'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        }
    ];
    private subscription = new Subscription();

    public ngOnInit() {
        this.loadMarkers();
    }

    public async markerClicked(event: AgmMarker, m: any) {
        console.log(m);

        const dialogRef = this.dialog.open(PopoverComponent, {
            data: m
        });

        dialogRef.afterClosed().subscribe(
            result => {
                if (result.directions) {
                    this.getDirections(result.data);
                } else {
                    this.subscription.add(
                        this.stationService.updateStation(result.data.stationId, result.data).subscribe()
                    );
                }
            });
    }

    public getDirections(data: any) {
        console.log(data);
        const directions: Directions = {
            origin: '44.3854,26.1075978',
            destination: data.coordinates.latitude + ',' + data.coordinates.longitude
        };

        this.subscription.add(this.stationService.directions2(directions).subscribe(
            (res) => {
                this.routeOverview = res.routes[0];
                this.bounds = {
                    south: this.routeOverview.bounds.southWest.latitude,
                    north: this.routeOverview.bounds.northEast.latitude,
                    east: this.routeOverview.bounds.northEast.longitude,
                    west: this.routeOverview.bounds.southWest.longitude,
                };

                this.route = res.routes[0].overviewPath.line;

            }
        ));
    }

    public loadMarkers() {
        this.stationService.getStations().subscribe(
            (stations) => {
                this.markers = stations;
            }
        );
    }

    public getCoordinates() {
        this.stationService.directions().subscribe(
            (r) => console.log(r),
            (er) => console.log(er)
        );
    }
    getDirection() {
        this.origin = { lat: 43.3854, lng: 28.1075978 };
        this.destination = { lat: 45.382632, lng: 26.108657 };

        // this.origin = 'Taipei Main Station'
        // this.destination = 'Taiwan Presidential Office'
    }

    public iconUrl(n: number): string {
        return n === 0 ? './assets/0.png' : './assets/1.png';
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
