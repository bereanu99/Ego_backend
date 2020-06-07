import { CommonModule } from '@angular/common';
import { RegisterComponent } from './features/register/register.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { IonContent, IonicModule } from '@ionic/angular';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'slider',
        loadChildren: () => import('./features/main-slider/main-slider.module').then((module) => module.MainSliderModule),
    },
    {
        path: 'map',
        loadChildren: () => import('./features/map/map.module').then((module) => module.MapModule),
    }
];
// Animation fix
// https://stackoverflow.com/questions/58421686/ionic4-native-page-transitions-not-working-on-router-navigate

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        MaterialModule,
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        RouterModule,
        MaterialModule,
    ]
})
export class AppRoutingModule { }
