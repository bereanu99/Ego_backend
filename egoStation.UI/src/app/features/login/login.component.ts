import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    loading = false;
    submitted = false;
    returnUrl: string;
    constructor(
        private route: ActivatedRoute,
        private loadingController: LoadingController,
        private router: Router,
        private authenticationService: AuthService,
    ) {

    }

    public async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Asteptati...',
            duration: 1500
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
    }


    public onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.presentLoading();
        console.log(this.loginForm.value);

        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(

            response => {
                this.router.navigate(['/slider']);
            },
            err => {
                alert('error');
            },
        );
        this.loading = true;
    }

    public redirectToRegister() {
        this.router.navigate(['/register']);
    }
}
