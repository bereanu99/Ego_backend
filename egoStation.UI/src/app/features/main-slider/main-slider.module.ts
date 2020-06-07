import { UserComponent } from './../user/user.component';
import { MainSliderComponent } from './main-slider.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarComponent } from '../car/car.component';

@NgModule({
    imports: [
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
        CarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainSliderModule {}
