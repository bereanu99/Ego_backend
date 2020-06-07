import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MapComponent }
        ]),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA7N7PK0olNEkLval3s18qrKhONNS4tb68'
        }),
    ],
    declarations: [MapComponent],
    exports: [MapComponent]
})
export class MapModule {}
