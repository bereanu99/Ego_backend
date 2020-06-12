import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../material.module';
import { UserComponent } from './../user/user.component';
import { MainSliderComponent } from './main-slider.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarComponent } from '../car/car.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild([
            { path: '', component: MainSliderComponent,
                children: [
                    {
                        path: 'map',
                        loadChildren: () => import('../map/map.module').then((module) => module.MapModule),
                    },
                    {
                        path: 'user',
                        component: UserComponent
                    },
                    {
                        path: 'car',
                       component: CarComponent
                    },
                    {
                        path: '',
                        redirectTo: 'map',
                        pathMatch: 'full'
                    },
                ],
            },
        ]),
    ],
    declarations: [
        MainSliderComponent,
        UserComponent,
        CarComponent
    ],
    exports: [
        MainSliderComponent,
        UserComponent,
        CarComponent,
        MaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainSliderModule {}
