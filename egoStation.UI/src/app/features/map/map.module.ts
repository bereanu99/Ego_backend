import { PopoverComponent } from './../popover/popover.component';
import { MaterialModule } from './../../material.module';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

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
    ],
    declarations: [MapComponent, PopoverComponent],
    exports: [MapComponent],
    entryComponents: [PopoverComponent]
})
export class MapModule {}
