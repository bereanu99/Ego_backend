import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/user.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnDestroy {
    public userId: string = JSON.parse(localStorage.getItem('userid'));
    public userForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl(''),
    });

    public subscription = new Subscription();

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly loadingController: LoadingController,
    ) {
        this.subscription.add(
            this.userService.getUserInfo(this.userId).subscribe(
                (result) => {
                    this.userForm.patchValue(result);
                    this.userForm.controls.confirmPassword.patchValue(result.password);
                }
            )
        );
    }

    public passwordConf() {
        const pas = this.userForm.controls.password.value;
        const pasC = this.userForm.controls.confirmPassword.value;

        if (pas !== pasC) {
            return true;
        }

        return false;
    }

    public async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Asteptati...',
            duration: 1000,
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
    }

    public saveUserInfo() {
        this.userService.postUserInfo(this.userId, this.userForm.value).subscribe(
            response => {
                this.router.navigate(['/slider']);
            },
            err => {
                alert('error');
            },
        );
        this.presentLoading();
    }
    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
