import { PopoverComponent } from './../popover/popover.component';
import { MaterialModule } from './../../material.module';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

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
        AgmJsMarkerClustererModule,
    ],
    declarations: [MapComponent, PopoverComponent],
    exports: [MapComponent],
    entryComponents: [PopoverComponent],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapModule {}
