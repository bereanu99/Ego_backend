import { Component, OnDestroy } from '@angular/core';
import { FormGroup,  FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { LoadingController } from '@ionic/angular';

export interface Car {
    brand: string;
    model: string;
    chargeType: number;
    battery: number;
}

@Component({
    selector: 'app-car',
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnDestroy {
    public carId: string = JSON.parse(localStorage.getItem('carid'));
    public carForm = new FormGroup({
        carId: new FormControl(this.carId),
        brand: new FormControl(''),
        model: new FormControl(''),
        chargeType: new FormControl(0),
        battery: new FormControl(0),
    });

    public subscription = new Subscription();

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly loadingController: LoadingController,
    ) {
        this.subscription.add(
            this.userService.getCarInfo(this.carId).subscribe(
                (result) => {
                    this.carForm.patchValue(result);
                }
            )
        );
    }

    public async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Asteptati...',
            duration: 1000,
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
    }

    public saveCarInfo() {
        const car: Car = {
            brand: this.carForm.value.brand,
            model: this.carForm.value.model,
            chargeType: +this.carForm.value.chargeType,
            battery: +this.carForm.value.battery,
        };
        console.log(car);
        this.subscription.add(
            this.userService.saveCarInfo(car).subscribe(
                response => {
                    this.router.navigate(['/slider']);
                },
                err => {
                    alert('error');
                },
            )
        );
        this.presentLoading();
    }

    public deleteCarInfo() {
        this.userService.deleteCarInfo(this.carId).subscribe(
            (a) => console.log(a)
        );
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
