import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

    public registerForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private authenticationService: AuthService,
    ) {
    }


    // convenience getter for easy access to form fields

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.authenticationService.register(
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.email,
            this.registerForm.value.password,
            ).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/login']);
            },
            err => {
                alert('error');
            },
        );

        this.loading = true;
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
