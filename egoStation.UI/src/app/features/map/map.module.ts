import { MaterialModule } from './../../material.module';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild([
            { path: '', component: MapComponent }
        ]),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA7N7PK0olNEkLval3s18qrKhONNS4tb68'
        }),
        AgmDirectionModule,
    ],
    declarations: [MapComponent],
    exports: [MapComponent]
})
export class MapModule {}
