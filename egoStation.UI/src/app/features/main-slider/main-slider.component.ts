import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-slider',
    templateUrl: './main-slider.component.html',
    styleUrls: ['./main-slider.component.scss'],
})
export class MainSliderComponent {

    constructor(
        private router: Router,
    ) { }

    public navigate(location: string) {
        this.router.navigate(['slider/' + location]);
    }
}
