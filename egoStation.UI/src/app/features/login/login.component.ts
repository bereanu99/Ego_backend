import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
        private router: Router,
        private authenticationService: AuthService,
    ) {

    }
    // convenience getter for easy access to form fields

    public onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

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
