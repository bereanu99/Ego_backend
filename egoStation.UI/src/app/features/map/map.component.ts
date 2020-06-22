// tslint:disable: max-line-length
import { StationService } from './../../core/station.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { AgmMap, LatLngBoundsLiteral, AgmMarker } from '@agm/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopoverComponent } from '../popover/popover.component';

export interface Directions {
    origin: string;
    destination: string;
}

export interface Station {
    id: string;
    name: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    description: string;
    status: number;
    chargeType: number;
    power: number;
}
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
    @ViewChild('AgmMap') agmMap: AgmMap;
    origin: { lat: number; lng: number; };
    destination: { lat: number; lng: number; };

    constructor(
        private readonly stationService: StationService,
        private readonly dialog: MatDialog,
        private readonly snackBar: MatSnackBar
    ) { }
    public navigate = false;
    public latitude = 44.3854;
    public longitude = 26.1075978;
    public markers;
    public bounds!: LatLngBoundsLiteral;
    public route!: any;
    public routeOverview!: any;
    data = [{
        address: '\u0433. \u0418\u0437\u043c\u0430\u0438\u043b, \u043f\u0440-\u0442 \u0421\u0443\u0432\u043e\u0440\u043e\u0432\u0430, 2',
        access: 1,
        latitude: 45.333811,
        name: '2230 DC - (112A) CCS-T2/T1 (112A) AC-T2 (32A) / T1 (40A)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 214012,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1433585,
                power: 0
            }],
            id: 462207
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 973024,
                power: 0
            }],
            id: 460742
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1433584,
                power: 0
            }],
            id: 532446
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1433586,
                power: 0
            }],
            id: 462208
        }],
        url: 'http://api.plugshare.com/view/location/214012',
        longitude: 28.833275,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Termocentralei nr. 10, T\u00e2rgu Jiu 210233',
        access: 1,
        latitude: 45.02481,
        name: 'Shopping City',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 187112,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1108164,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1108163,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1108162,
                power: 0
            }],
            id: 478050
        }],
        url: 'http://api.plugshare.com/view/location/187112',
        longitude: 23.264826,
        icon_type: 'Y'
    }, {
        score: 8.6,
        address: 'E581, Moldova',
        access: 1,
        latitude: 46.795256,
        name: 'EcoFactor MOLDOVA 920025 (VENTO SAC-23)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 185754,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 683146,
                power: 0
            }],
            id: 385762
        }],
        url: 'http://api.plugshare.com/view/location/185754',
        longitude: 28.167948,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'calea Lugojului nr. 31, F\u0103get 305300',
        access: 1,
        latitude: 45.854128,
        name: 'Penny Market',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 203837,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 780686,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 780684,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 767435,
                power: 0
            }],
            id: 433479
        }],
        url: 'http://api.plugshare.com/view/location/203837',
        longitude: 22.17709,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'pia\u021ba 1 Decembrie 1918 nr. 1A, Re\u0219i\u021ba 320084',
        access: 1,
        latitude: 45.290486,
        name: 'Re\u0219i\u021ba, Parcare public\u0103',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 144437,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 543660,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 543661,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 543662,
                power: 0
            }],
            id: 275076
        }],
        url: 'http://api.plugshare.com/view/location/144437',
        longitude: 21.887321,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Strada Barajului 32-34, R\u00e2mnicu V\u00e2lcea 240266, Romania',
        access: 1,
        latitude: 45.120317,
        name: 'Kaufland R\u00e2mnicu V\u00e2lcea ',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 100362,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1097796,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1097795,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1097794,
                power: 0
            }],
            id: 476796
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1087923,
                power: 0
            }],
            id: 475579
        }],
        url: 'http://api.plugshare.com/view/location/100362',
        longitude: 24.371105,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Strada Kossuth Lajos 201, Gheorgheni 535500, Romania',
        access: 1,
        latitude: 46.712904,
        name: 'MOL Gheorgheni',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 188420,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1106579,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 1106578,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1106577,
                power: 0
            }],
            id: 477806
        }],
        url: 'http://api.plugshare.com/view/location/188420',
        longitude: 25.567304,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Prim\u0103verii nr. 58, Sovata 545500',
        access: 1,
        latitude: 46.581593,
        name: 'MOL Sovata',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 197015,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319620,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1319619,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1105343,
                power: 0
            }],
            id: 477682
        }],
        url: 'http://api.plugshare.com/view/location/197015',
        longitude: 25.056178,
        icon_type: 'Y'
    }, {
        score: 9.0,
        address: 'Strada George Co\u015fbuc nr.59-59A, F\u0103g\u0103ra\u0219, Rom\u00e2nia',
        access: 1,
        latitude: 45.838539,
        name: 'Buderus Shop',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 216535,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1108273,
                power: 0
            }],
            id: 478054
        }],
        url: 'http://api.plugshare.com/view/location/216535',
        longitude: 24.97149,
        icon_type: 'Y'
    }, {
        address: 'Bacau, Rom\u00e2nia',
        access: 1,
        latitude: 45.106445,
        name: 'Filip (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/YR.png',
        id: 242637,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1369742,
                power: 0
            }],
            id: 525760
        }],
        url: 'http://api.plugshare.com/view/location/242637',
        longitude: 27.206578,
        icon_type: 'YR'
    }, {
        score: 9.0,
        address: 'str. Mihai Eminescu nr. 225, Covasna 525200',
        access: 1,
        latitude: 45.846469,
        name: 'Hotel TTS Spa&Wellness Covasna',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 166162,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 616771,
                power: 0
            }],
            id: 334193
        }],
        url: 'http://api.plugshare.com/view/location/166162',
        longitude: 26.215878,
        icon_type: 'G'
    }, {
        score: 8.6,
        address: 'DN2 1180, Criste\u0219ti 707145, Romania',
        access: 1,
        latitude: 47.25266,
        name: 'Pensiunea Criste\u015fti',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 177021,
        stations: [{
            outlets: [{
                kilowatts: 43.0,
                connector: 7,
                id: 1104695,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 13,
                id: 1096308,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 3,
                id: 1096307,
                power: 0
            }],
            id: 476570
        }],
        url: 'http://api.plugshare.com/view/location/177021',
        longitude: 26.561339,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Stadionului, Kaufland',
        access: 1,
        latitude: 46.226332,
        name: 'Kaufland Sighisoara',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 154957,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1159508,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1159507,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1159506,
                power: 0
            }],
            id: 484947
        }],
        url: 'http://api.plugshare.com/view/location/154957',
        longitude: 24.808513,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Bicazului, Ta\u0219ca 617455',
        access: 1,
        latitude: 46.894046,
        name: 'Ta\u0219ca Jud Neamt',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 177022,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319613,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1319612,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1091420,
                power: 0
            }],
            id: 476059
        }],
        url: 'http://api.plugshare.com/view/location/177022',
        longitude: 26.023199,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'DJ108I, Rom\u00e2nia',
        access: 1,
        latitude: 47.04144,
        name: 'MPS Logistic',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 134263,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 506250,
                power: 0
            }],
            id: 246718
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 506245,
                power: 0
            }],
            id: 246705
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 506249,
                power: 0
            }],
            id: 246717
        }],
        url: 'http://api.plugshare.com/view/location/134263',
        longitude: 22.364053,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Karcag, Bajcsy-Zsilinszky u. 2, 5300 Magyarorsz\u00e1g',
        access: 1,
        latitude: 47.316621,
        name: 'Karcag NKM fizet\u0151s',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 145887,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 608162,
                power: 0
            }],
            id: 327215
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 608163,
                power: 0
            }],
            id: 327216
        }],
        url: 'http://api.plugshare.com/view/location/145887',
        longitude: 20.924743,
        icon_type: 'G'
    }, {
        address: 'Str. Gribov 2, Leova, Moldova',
        access: 1,
        latitude: 46.485605,
        name: 'EVPOINT Moldova, Leova, EV0014 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218040,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077666,
                power: 0
            }],
            id: 474465
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077665,
                power: 0
            }],
            id: 474464
        }],
        url: 'http://api.plugshare.com/view/location/218040',
        longitude: 28.273832,
        icon_type: 'G'
    }, {
        address: 'parcul Pia\u021ba 1848 nr. 1, Blaj 515400',
        access: 1,
        latitude: 46.174007,
        name: 'Pia\u021ba 1848',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 201216,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 747645,
                power: 0
            }],
            id: 427212
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 747644,
                power: 0
            }],
            id: 427211
        }],
        url: 'http://api.plugshare.com/view/location/201216',
        longitude: 23.923053,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Romania, Str. Emil Rebreanu nr 11A, Mun. Onesti, Jud Bacau',
        access: 1,
        latitude: 46.244198,
        name: 'POPAS BASARABIA',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 216086,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1021992,
                power: 0
            }],
            id: 465773
        }],
        url: 'http://api.plugshare.com/view/location/216086',
        longitude: 26.755531,
        icon_type: 'G'
    }, {
        address: '450, Aghires, Salaj, Romania, 457246, Romania',
        access: 1,
        latitude: 47.158782,
        name: 'Pensiunea Agape, Restaurant',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 202765,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1105364,
                power: 0
            }],
            id: 477689
        }, {
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 757642,
                power: 0
            }],
            id: 430997
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 757643,
                power: 0
            }],
            id: 430921
        }],
        url: 'http://api.plugshare.com/view/location/202765',
        longitude: 22.990775,
        icon_type: 'G'
    }, {
        score: 9.3,
        address: 'Str. Unirii Nr. 2, Roman 617246',
        access: 1,
        latitude: 46.924419,
        name: 'Roman Jud. Neamt',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 182734,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1091424,
                power: 0
            }],
            id: 476063
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1091423,
                power: 0
            }],
            id: 476062
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 673502,
                power: 0
            }],
            id: 378347
        }],
        url: 'http://api.plugshare.com/view/location/182734',
        longitude: 26.928287,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Str. Bogdan Vod\u0103 Nr. 3, T\u00e2rgu Frumos 705300',
        access: 1,
        latitude: 47.208699,
        name: 'Targu Frumos Jud. Iasi',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 177020,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319530,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1319529,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1106572,
                power: 0
            }],
            id: 477803
        }],
        url: 'http://api.plugshare.com/view/location/177020',
        longitude: 27.009855,
        icon_type: 'Y'
    }, {
        score: 8.3,
        address: 'calea Victoriei nr. 134, Turda 401030',
        access: 1,
        latitude: 46.560856,
        name: 'Kaufland Turda',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 159247,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1389516,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 13,
                id: 1389515,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 3,
                id: 1150592,
                power: 0
            }],
            id: 483227
        }, {
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 592654,
                power: 0
            }],
            id: 314639
        }],
        url: 'http://api.plugshare.com/view/location/159247',
        longitude: 23.817222,
        icon_type: 'Y'
    }, {
        address: '\u04221644, \u0422\u0430\u0440\u0443\u0442\u0438\u043d\u0435, \u041e\u0434\u0435\u0441\u044c\u043a\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c, \u0423\u043a\u0440\u0430\u0438\u043d\u0430, 68500',
        access: 1,
        latitude: 46.188966,
        name: 'EcoFactor 930033',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 197694,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 728189,
                power: 0
            }],
            id: 418442
        }],
        url: 'http://api.plugshare.com/view/location/197694',
        longitude: 29.151817,
        icon_type: 'G'
    }, {
        address: 'STRADA TITUS ANDRONIC NR 3',
        access: 1,
        latitude: 46.164045,
        name: 'MED SERVICE  - PEUGEOT / CITROEN',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 216663,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1042686,
                power: 0
            }],
            id: 470896
        }],
        url: 'http://api.plugshare.com/view/location/216663',
        longitude: 24.328768,
        icon_type: 'G'
    }, {
        address: 'Strada Portului 16, Mahmudia 827130, Romania',
        access: 1,
        latitude: 45.089608,
        name: 'Mon Jardin Hotel',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 238483,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1296715,
                power: 0
            }],
            id: 516816
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1296714,
                power: 0
            }],
            id: 516815
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1296713,
                power: 0
            }],
            id: 516814
        }],
        url: 'http://api.plugshare.com/view/location/238483',
        longitude: 29.089006,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Capela Prundu B\u00e2rg\u0103ului, E58, Prundu B\u00e2rg\u0103ului 427230',
        access: 1,
        latitude: 47.220015,
        name: 'Prundu B\u00e2rg\u0103ului (AERO 0002)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 206352,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 815116,
                power: 0
            }],
            id: 439614
        }],
        url: 'http://api.plugshare.com/view/location/206352',
        longitude: 24.73311,
        icon_type: 'G'
    }, {
        owner: {
            id: 497235,
            display_name: 'ionut',
            first_name: 'ionut'
        },
        score: 9.0,
        address: 'Strada \u0218tefan cel Mare 137, Tecuci 805300, Romania',
        access: 1,
        latitude: 45.848062,
        name: 'Nidcar srl Piese auto Tecuci',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 188134,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1148340,
                power: 0
            }],
            id: 482951
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 692269,
                power: 0
            }],
            id: 392703
        }],
        url: 'http://api.plugshare.com/view/location/188134',
        longitude: 27.434325,
        icon_type: 'G'
    }, {
        score: 8.9,
        address: '12-14, Strada G\u00e1bor \u00c1ron Street, Sf\u00e2ntu Gheorghe 520008, Romania',
        access: 1,
        latitude: 45.865836,
        name: 'Hotel Park',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 154499,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1105335,
                power: 0
            }],
            id: 477680
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1105336,
                power: 0
            }],
            id: 297445
        }],
        url: 'http://api.plugshare.com/view/location/154499',
        longitude: 25.783694,
        icon_type: 'Y'
    }, {
        score: 9.0,
        address: 'DJ105, Agnita 555100',
        access: 1,
        latitude: 45.984716,
        name: 'Lek3.co - Pensiunea Elisabeta - "CENTRUL TARII"',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 204762,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 784042,
                power: 0
            }],
            id: 435689
        }],
        url: 'http://api.plugshare.com/view/location/204762',
        longitude: 24.684348,
        icon_type: 'G'
    }, {
        address: '\u0433. \u0420\u0435\u043d\u0438, \u0443\u043b. \u0412\u043e\u0437\u043d\u0435\u0441\u0435\u043d\u0441\u043a\u0430\u044f, 177',
        access: 1,
        latitude: 45.457016,
        name: 'AutoEnterprise 2458 Hotel \u041a\u043e\u043b\u0438\u0431\u0440\u0438',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 226881,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1223732,
                power: 0
            }],
            id: 497461
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1223666,
                power: 0
            }],
            id: 497460
        }],
        url: 'http://api.plugshare.com/view/location/226881',
        longitude: 28.288746,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Telecabinei, Bu\u0219teni 105500, Romania',
        access: 1,
        latitude: 45.409567,
        name: 'Penny Market Busteni',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 137993,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1092729,
                power: 0
            }],
            id: 476198
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1092728,
                power: 0
            }],
            id: 476197
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1088043,
                power: 0
            }],
            id: 475588
        }],
        url: 'http://api.plugshare.com/view/location/137993',
        longitude: 25.53479,
        icon_type: 'Y'
    }, {
        address: '\u0433. \u0411\u043e\u043b\u0433\u0440\u0430\u0434, \u0443\u043b. \u0418\u043d\u0437\u043e\u0432\u0441\u043a\u0430\u044f',
        access: 1,
        latitude: 45.680442,
        name: 'AutoEnterprise 2456 pizza RIO',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 231824,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1255145,
                power: 0
            }],
            id: 505440
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1255153,
                power: 0
            }],
            id: 505439
        }],
        url: 'http://api.plugshare.com/view/location/231824',
        longitude: 28.61394,
        icon_type: 'G'
    }, {
        address: 'DN2F 116, Fundu Tutovei 607443, Rom\u00e2nia',
        access: 1,
        latitude: 46.698089,
        name: 'Tamaduirii',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 205885,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 805331,
                power: 0
            }],
            id: 438315
        }],
        url: 'http://api.plugshare.com/view/location/205885',
        longitude: 27.18316,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Bulevardul George Co\u0219buc 318, Gala\u021bi 800552, Rom\u00e2nia',
        access: 1,
        latitude: 45.453994,
        name: 'Galati Shopping City - Renovatio',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 215603,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1108155,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1108154,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1108153,
                power: 0
            }],
            id: 478047
        }],
        url: 'http://api.plugshare.com/view/location/215603',
        longitude: 28.033875,
        icon_type: 'Y'
    }, {
        score: 7.3,
        address: 'DN21, Br\u0103ila 817026, Rom\u00e2nia',
        access: 1,
        latitude: 45.232752,
        name: 'BRAILA MALL',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 215044,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1108158,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1108157,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1108156,
                power: 0
            }],
            id: 478048
        }],
        url: 'http://api.plugshare.com/view/location/215044',
        longitude: 27.938088,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Principala 405C, Baru,Hunedoara, Romania',
        access: 1,
        latitude: 45.473702,
        name: 'EUROELECTRIC',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 162163,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 603832,
                power: 0
            }],
            id: 323740
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 667242,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 603835,
                power: 0
            }],
            id: 323742
        }],
        url: 'http://api.plugshare.com/view/location/162163',
        longitude: 23.149663,
        icon_type: 'G'
    }, {
        address: 'Strada Libert\u0103\u0163ii nr 36, Buhu\u0219i 605100, Romania',
        access: 1,
        latitude: 46.711844,
        name: 'Stofe Buhusi\u2019s',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 245427,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1433658,
                power: 0
            }],
            id: 532482
        }],
        url: 'http://api.plugshare.com/view/location/245427',
        longitude: 26.69812,
        icon_type: 'G'
    }, {
        address: 'str. Albe\u015fti nr. 30K, Curtea de Arge\u0219 115300',
        access: 1,
        latitude: 45.16647,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 165617,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 615224,
                power: 0
            }],
            id: 332992
        }, {
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 615223,
                power: 0
            }],
            id: 332991
        }],
        url: 'http://api.plugshare.com/view/location/165617',
        longitude: 24.669215,
        icon_type: 'G'
    }, {
        address: 'Starada Gavriliuk 12, Comrat 3800, Moldova',
        access: 1,
        latitude: 46.306637,
        name: 'Bemol Gas Station',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218055,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1357796,
                power: 0
            }],
            id: 524075
        }, {
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1192815,
                power: 0
            }],
            id: 474500
        }],
        url: 'http://api.plugshare.com/view/location/218055',
        longitude: 28.660291,
        icon_type: 'G'
    }, {
        address: 'E584, Congaz, Moldova',
        access: 1,
        latitude: 46.093361,
        name: 'EcoFactor MOLDOVA (Vento Sac-58)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 204381,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 776699,
                power: 0
            }],
            id: 434770
        }],
        url: 'http://api.plugshare.com/view/location/204381',
        longitude: 28.594872,
        icon_type: 'G'
    }, {
        address: 'str. Lenin 7/5 Cead\u00eer-Lunga, 6103, Moldova',
        access: 1,
        latitude: 46.06328,
        name: 'Bemol Gas Station',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218046,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1192817,
                power: 0
            }],
            id: 474479
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1359952,
                power: 0
            }],
            id: 524196
        }],
        url: 'http://api.plugshare.com/view/location/218046',
        longitude: 28.814565,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DJ608A, Borlova 327406',
        access: 1,
        latitude: 45.356461,
        name: 'LEK3.CO - Gasthaus Maria',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 175801,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 676492,
                power: 0
            }],
            id: 360279
        }],
        url: 'http://api.plugshare.com/view/location/175801',
        longitude: 22.372793,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'aleea 1 Mai B4, Huedin 405400',
        access: 1,
        latitude: 46.863096,
        name: 'Telekom Rom\u00e2nia Communications SA',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 202776,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 757583,
                power: 0
            }],
            id: 430966
        }],
        url: 'http://api.plugshare.com/view/location/202776',
        longitude: 23.02669,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Unnamed Road, M\u0103ri\u0219el 407390, Rom\u00e2nia',
        access: 1,
        latitude: 46.664014,
        name: 'Partie ski Marisel',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 214754,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 992126,
                power: 0
            }],
            id: 462516
        }],
        url: 'http://api.plugshare.com/view/location/214754',
        longitude: 23.076735,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Vasile Alecsandri 8, Sl\u0103nic Moldova 605500, Romania',
        access: 1,
        latitude: 46.207838,
        name: 'Vila Teleconstruc\u021bia',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 189523,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 696701,
                power: 0
            }],
            id: 396051
        }],
        url: 'http://api.plugshare.com/view/location/189523',
        longitude: 26.437991,
        icon_type: 'G'
    }, {
        address: 'or. Ungheni MD strada \u015etefan cel Mare 45, Ungheni, Moldova',
        access: 1,
        latitude: 47.197747,
        name: 'EcoFactor MOLDOVA 940041 (VENTO SAC-45)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 215248,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1004830,
                power: 0
            }],
            id: 463837
        }],
        url: 'http://api.plugshare.com/view/location/215248',
        longitude: 27.800033,
        icon_type: 'G'
    }, {
        address: 'DN13A, B\u0103ile Homorod, Rom\u00e1nia',
        access: 1,
        latitude: 46.350051,
        name: 'Complex Lobogo',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 162321,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 604382,
                power: 0
            }],
            id: 324215
        }],
        url: 'http://api.plugshare.com/view/location/162321',
        longitude: 25.474481,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DN7, 317235, Romania',
        access: 1,
        latitude: 46.181414,
        name: 'Smart Autohof Pecica',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 215267,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1049476,
                power: 0
            }],
            id: 471535
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1005224,
                power: 0
            }],
            id: 463875
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1005223,
                power: 0
            }],
            id: 463874
        }],
        url: 'http://api.plugshare.com/view/location/215267',
        longitude: 21.118787,
        icon_type: 'Y'
    }, {
        address: 'Balabanu, Taraclia, Moldova',
        access: 1,
        latitude: 45.929718,
        name: 'EVPOINT Moldova, Balabanu, EV0012 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218042,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077756,
                power: 0
            }],
            id: 474468
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077757,
                power: 0
            }],
            id: 474469
        }],
        url: 'http://api.plugshare.com/view/location/218042',
        longitude: 28.569159,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'Madaras Ciuc',
        access: 1,
        latitude: 46.503266,
        name: 'MHC2 Madaras Hydropower',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 127019,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 478378,
                power: 0
            }],
            id: 228607
        }],
        url: 'http://api.plugshare.com/view/location/127019',
        longitude: 25.724879,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DN67, Bumbe\u0219ti-Pi\u021bic 217110',
        access: 1,
        latitude: 45.13273,
        name: 'Prim\u0103ria Bumbe\u0219ti-Pi\u021bic',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 191799,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 704581,
                power: 0
            }],
            id: 402138
        }],
        url: 'http://api.plugshare.com/view/location/191799',
        longitude: 23.698023,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DN67C 174, R\u00e2nca 217365',
        access: 1,
        latitude: 45.291682,
        name: 'Pensiunea R\u00e2nca Ski',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 193272,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 712446,
                power: 0
            }],
            id: 406235
        }],
        url: 'http://api.plugshare.com/view/location/193272',
        longitude: 23.689673,
        icon_type: 'G'
    }, {
        address: 'DJ107B 174, P\u0103uca 557175, Romania',
        access: 1,
        latitude: 46.010458,
        name: 'Primaria Pauca',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 243368,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1399914,
                power: 0
            }],
            id: 527615
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1399913,
                power: 0
            }],
            id: 527614
        }],
        url: 'http://api.plugshare.com/view/location/243368',
        longitude: 23.888602,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DN672C, Runcu 217390',
        access: 1,
        latitude: 45.126298,
        name: 'PRIMARIA RUNCU',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 192563,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 707317,
                power: 0
            }],
            id: 404372
        }],
        url: 'http://api.plugshare.com/view/location/192563',
        longitude: 23.148598,
        icon_type: 'G'
    }, {
        address: 'DJ155F, Romania',
        access: 1,
        latitude: 46.999458,
        name: 'Pensiunea Antia',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 212695,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 943843,
                power: 0
            }],
            id: 457121
        }],
        url: 'http://api.plugshare.com/view/location/212695',
        longitude: 25.91582,
        icon_type: 'G'
    }, {
        address: 'bd. Tudor Vladimirescu nr. 23\u201351, P\u00e2ncota 315600',
        access: 1,
        latitude: 46.327491,
        name: 'Bistro Caffe',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 196302,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 723477,
                power: 0
            }],
            id: 414650
        }],
        url: 'http://api.plugshare.com/view/location/196302',
        longitude: 21.690205,
        icon_type: 'G'
    }, {
        score: 7.6,
        address: 'DJ792, Ineu 315300, Romania',
        access: 1,
        latitude: 46.401607,
        name: 'Hanul Moara cu Noroc',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 171231,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 634733,
                power: 0
            }],
            id: 348276
        }],
        url: 'http://api.plugshare.com/view/location/171231',
        longitude: 21.818287,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Draganu',
        access: 1,
        latitude: 44.945046,
        name: 'Octano',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 187006,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 688550,
                power: 0
            }],
            id: 389720
        }, {
            outlets: [{
                kilowatts: null,
                connector: 8,
                id: 688549,
                power: 0
            }],
            id: 389719
        }],
        url: 'http://api.plugshare.com/view/location/187006',
        longitude: 24.700309,
        icon_type: 'G'
    }, {
        address: 'Valea Avrigului, Avrig, Sibiu, Romania',
        access: 1,
        latitude: 45.710177,
        name: 'Pensiunea Ghiocelul',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 232468,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1265112,
                power: 0
            }],
            id: 506935
        }],
        url: 'http://api.plugshare.com/view/location/232468',
        longitude: 24.428498,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DN1B, Km 57, Sat, Com. Merei Buzau RO, Dealul Viei, Romania',
        access: 1,
        latitude: 45.094817,
        name: 'MCM Dealul Viei',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 149830,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1096821,
                power: 0
            }],
            id: 476637
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1096823,
                power: 0
            }],
            id: 476636
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1089008,
                power: 0
            }],
            id: 475704
        }],
        url: 'http://api.plugshare.com/view/location/149830',
        longitude: 26.678785,
        icon_type: 'Y'
    }, {
        address: 'Telecabin 1 Departure, Romania',
        access: 1,
        latitude: 45.417762,
        name: 'Parcare Ski Transalpina',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 236490,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1279891,
                power: 0
            }],
            id: 511926
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1279890,
                power: 0
            }],
            id: 511925
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1279889,
                power: 0
            }],
            id: 511924
        }],
        url: 'http://api.plugshare.com/view/location/236490',
        longitude: 23.704619,
        icon_type: 'G'
    }, {
        address: 'DN1, Rom\u00e2nia',
        access: 1,
        latitude: 45.702459,
        name: 'F\u00e2nt\u00e2ni\u021ba Haiducului',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 212026,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 928530,
                power: 0
            }],
            id: 455292
        }],
        url: 'http://api.plugshare.com/view/location/212026',
        longitude: 24.28591,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: '44.9831985,26.715385',
        access: 1,
        latitude: 44.982615,
        name: 'Pollux',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 94089,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 969851,
                power: 0
            }],
            id: 460323
        }],
        url: 'http://api.plugshare.com/view/location/94089',
        longitude: 26.715134,
        icon_type: 'G'
    }, {
        address: 'Elek, Gerolzhofen 15, 5742, Hungary',
        access: 1,
        latitude: 46.535477,
        name: 'Cs\u00f6kmei \u00e9s T\u00e1rsa Bt.',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 39529,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 618186,
                power: 0
            }],
            id: 335407
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 382726,
                power: 0
            }],
            id: 54134
        }],
        url: 'http://api.plugshare.com/view/location/39529',
        longitude: 21.252065,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DC79, Sta\u021biunea Climateric\u0103 S\u00e2mb\u0103ta 507267, Rom\u00e2nia',
        access: 1,
        latitude: 45.692537,
        name: 'Pensiunea Poiana Izvorului',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 146024,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 548888,
                power: 0
            }],
            id: 279434
        }],
        url: 'http://api.plugshare.com/view/location/146024',
        longitude: 24.804753,
        icon_type: 'G'
    }, {
        address: 'DN1, Romania',
        access: 1,
        latitude: 45.700891,
        name: 'MOL - Under Construction (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/YR.png',
        id: 248096,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1471938,
                power: 0
            }],
            id: 542303
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1471937,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1471936,
                power: 0
            }],
            id: 542302
        }],
        url: 'http://api.plugshare.com/view/location/248096',
        longitude: 24.249149,
        icon_type: 'YR'
    }, {
        address: 'E583 km. 61, Bud\u0103i 707366',
        access: 1,
        latitude: 47.218389,
        name: 'Pensiunea Tyf',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 183560,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 676007,
                power: 0
            }],
            id: 380136
        }],
        url: 'http://api.plugshare.com/view/location/183560',
        longitude: 27.228692,
        icon_type: 'G'
    }, {
        address: 'Vulcan, Romania',
        access: 1,
        latitude: 45.625762,
        name: 'Hotel Wolkendorfer',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 170164,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 630866,
                power: 0
            }],
            id: 345354
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 630865,
                power: 0
            }],
            id: 345353
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 630864,
                power: 0
            }],
            id: 345352
        }, {
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 630863,
                power: 0
            }],
            id: 345351
        }, {
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 630862,
                power: 0
            }],
            id: 345350
        }, {
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 630861,
                power: 0
            }],
            id: 345349
        }],
        url: 'http://api.plugshare.com/view/location/170164',
        longitude: 25.41122,
        icon_type: 'G'
    }, {
        score: 8.6,
        address: 'str. Ecaterina Varga nr. 9, Hunedoara 331005',
        access: 1,
        latitude: 45.767121,
        name: 'Dedeman',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 142881,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 538208,
                power: 0
            }],
            id: 270707
        }],
        url: 'http://api.plugshare.com/view/location/142881',
        longitude: 22.90416,
        icon_type: 'G'
    }, {
        address: '\u041e\u0434\u0435\u0441\u0441\u043a\u0430\u044f \u043e\u0431\u043b., c. \u041a\u0438\u0441\u043b\u0438\u0446\u0430, \u0443\u043b. \u0414\u0443\u043d\u0430\u0439\u0441\u043a\u0430\u044f, 2 \u0431',
        access: 1,
        latitude: 45.333432,
        name: 'AutoEnterprise 2108',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 213732,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 966371,
                power: 0
            }],
            id: 459733
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 966370,
                power: 0
            }],
            id: 459732
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 966369,
                power: 0
            }],
            id: 459731
        }],
        url: 'http://api.plugshare.com/view/location/213732',
        longitude: 28.954002,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'DC47, Arpa\u0219u de Sus 557016',
        access: 1,
        latitude: 45.698115,
        name: 'P\u0103str\u0103v\u0103ria Albota',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 164074,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 609658,
                power: 0
            }],
            id: 328467
        }, {
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 609657,
                power: 0
            }],
            id: 328466
        }],
        url: 'http://api.plugshare.com/view/location/164074',
        longitude: 24.610817,
        icon_type: 'G'
    }, {
        address: 'Nimoreni, Ialoveni, Moldova',
        access: 1,
        latitude: 46.995169,
        name: 'EVPOINT Moldova, Nimoreni, EV0017 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218045,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077766,
                power: 0
            }],
            id: 474476
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077765,
                power: 0
            }],
            id: 474475
        }],
        url: 'http://api.plugshare.com/view/location/218045',
        longitude: 28.665934,
        icon_type: 'G'
    }, {
        address: 'Kossuth Lajos utca',
        access: 1,
        latitude: 46.772766,
        name: 'Penny parkol\u00f3 charger (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 218417,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1087040,
                power: 0
            }],
            id: 475415
        }],
        url: 'http://api.plugshare.com/view/location/218417',
        longitude: 21.126985,
        icon_type: 'GR'
    }, {
        address: '\u0219os. Bor\u0219ului nr. 400, Bor\u0219 410605',
        access: 1,
        latitude: 47.108792,
        name: 'HOTEL IRIS',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 201704,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 751023,
                power: 0
            }],
            id: 428410
        }],
        url: 'http://api.plugshare.com/view/location/201704',
        longitude: 21.819449,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Moieciu,Rom\u00e2nia',
        access: 1,
        latitude: 45.463715,
        name: 'Complexul Cheile Gradistei',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 162899,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 606268,
                power: 0
            }],
            id: 325657
        }],
        url: 'http://api.plugshare.com/view/location/162899',
        longitude: 25.304297,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Moldovei 79, Com\u0103ne\u0219ti 605200, Rom\u00e2nia',
        access: 1,
        latitude: 46.405989,
        name: 'Lek3.co Casa Georgia',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 191634,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 703994,
                power: 0
            }],
            id: 401691
        }],
        url: 'http://api.plugshare.com/view/location/191634',
        longitude: 26.475418,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Aeroportului nr. 2, Ghiroda 307200',
        access: 1,
        latitude: 45.810139,
        name: 'Aeroport Timi\u0219oara (TSR)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 131439,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 513454,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 513455,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 513456,
                power: 0
            }],
            id: 239335
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 513448,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 513449,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 513450,
                power: 0
            }],
            id: 239333
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 513451,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 513452,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 513453,
                power: 0
            }],
            id: 239334
        }],
        url: 'http://api.plugshare.com/view/location/131439',
        longitude: 21.318843,
        icon_type: 'Y'
    }, {
        score: 4.2,
        address: 'calea Timi\u0219orii nr. 3, S\u00e2nandrei 307375 (DJ692)',
        access: 1,
        latitude: 45.84548,
        name: 'Biarena Restaurant',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 169621,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 628849,
                power: 0
            }],
            id: 343805
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 628850,
                power: 0
            }],
            id: 343806
        }],
        url: 'http://api.plugshare.com/view/location/169621',
        longitude: 21.174568,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Calea Ie\u015filor 8, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 47.039351,
        name: 'EcoFactor Moldova FastCharger (Zorile Zity Mall)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 200502,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1421787,
                power: 0
            }],
            id: 530242
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1421786,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1421785,
                power: 0
            }],
            id: 425536
        }],
        url: 'http://api.plugshare.com/view/location/200502',
        longitude: 28.803384,
        icon_type: 'Y'
    }, {
        score: 9.0,
        address: ' Chi\u021borani 107112, Romania',
        access: 1,
        latitude: 44.981103,
        name: 'Casa Timis Lek3.co',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 215305,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1006094,
                power: 0
            }],
            id: 463973
        }],
        url: 'http://api.plugshare.com/view/location/215305',
        longitude: 26.122357,
        icon_type: 'G'
    }, {
        address: 'Bra\u015fov, Rom\u00e2nia',
        access: 1,
        latitude: 45.531228,
        name: 'Cuibul de Lemn',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 231800,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 6,
                id: 1254628,
                power: 0
            }],
            id: 505396
        }],
        url: 'http://api.plugshare.com/view/location/231800',
        longitude: 25.442542,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Str Orzea. Comuna Moroeni. D\u00e2mbovi\u021ba ',
        access: 1,
        latitude: 45.393532,
        name: 'Hotel Pe\u0219tera ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 132384,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 590431,
                power: 0
            }],
            id: 312808
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 590434,
                power: 0
            }],
            id: 312809
        }],
        url: 'http://api.plugshare.com/view/location/132384',
        longitude: 25.442551,
        icon_type: 'G'
    }, {
        address: '\u0418\u0437\u043c\u0430\u0438\u043b\u044c\u0441\u043a\u0438\u0439 \u0440\u0430\u0439\u043e\u043d, \u0441. \u0421\u043e\u0444\u044c\u044f\u043d\u044b, \u0443\u043b. \u042f\u0440\u043e\u0441\u043b\u0430\u0432\u0430 \u041c\u0443\u0434\u0440\u043e\u0433\u043e, 1',
        access: 1,
        latitude: 45.406667,
        name: 'ElectroUA 0917',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 143718,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 541116,
                power: 0
            }],
            id: 273016
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 541114,
                power: 0
            }],
            id: 273014
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 541115,
                power: 0
            }],
            id: 273015
        }],
        url: 'http://api.plugshare.com/view/location/143718',
        longitude: 28.873164,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: '\u0433. \u0418\u0437\u043c\u0430\u0438\u043b, \u0443\u043b.\u0428\u0435\u0432\u0447\u0435\u043d\u043a\u0430, 62',
        access: 1,
        latitude: 45.365618,
        name: 'ElectroUA 1162 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d GURMAN',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 161418,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 601341,
                power: 0
            }],
            id: 321722
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 601340,
                power: 0
            }],
            id: 321721
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 601339,
                power: 0
            }],
            id: 321720
        }],
        url: 'http://api.plugshare.com/view/location/161418',
        longitude: 28.825896,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'DN1 km. 96, Cornu 107175',
        access: 1,
        latitude: 45.148934,
        name: 'ETU Cornu',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 192386,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1256600,
                power: 0
            }],
            id: 505613
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1256601,
                power: 0
            }],
            id: 403776
        }],
        url: 'http://api.plugshare.com/view/location/192386',
        longitude: 25.697844,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'calea Radnei nr. 190-192, Arad 310292',
        access: 1,
        latitude: 46.178306,
        name: 'Rompetrol (Radnei)',
        icon: 'https://assets.plugshare.com/icons/YR.png',
        id: 152980,
        stations: [{
            outlets: [{
                kilowatts: 50.0,
                connector: 3,
                id: 1038515,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 13,
                id: 1038516,
                power: 0
            }, {
                kilowatts: 22.0,
                connector: 7,
                id: 1038517,
                power: 0
            }],
            id: 470351
        }],
        url: 'http://api.plugshare.com/view/location/152980',
        longitude: 21.351901,
        icon_type: 'YR'
    }, {
        address: 'E58, Sculeni, UNgheni, Moldova',
        access: 1,
        latitude: 47.327635,
        name: 'EVPOINT Moldova, Sculeni, EV0020 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218051,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077787,
                power: 0
            }],
            id: 474490
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077786,
                power: 0
            }],
            id: 474489
        }],
        url: 'http://api.plugshare.com/view/location/218051',
        longitude: 27.613027,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'Bulevardul Nicolae B\u0103lcescu 1, C\u00e2mpina 105600, Rom\u00e2nia',
        access: 1,
        latitude: 45.113247,
        name: 'ETU C\u00e2mpina',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 246999,
        stations: [{
            network_id: 52,
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1459530,
                power: 0
            }],
            id: 537286
        }, {
            network_id: 52,
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1459531,
                power: 0
            }],
            id: 537204
        }],
        url: 'http://api.plugshare.com/view/location/246999',
        longitude: 25.745207,
        icon_type: 'G'
    }, {
        score: 7.5,
        address: 'Adjud',
        access: 1,
        latitude: 46.088567,
        name: 'Rompetrol Adjud',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 188984,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1091394,
                power: 0
            }],
            id: 476034
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1091393,
                power: 0
            }],
            id: 476033
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 694737,
                power: 0
            }],
            id: 394601
        }],
        url: 'http://api.plugshare.com/view/location/188984',
        longitude: 27.190682,
        icon_type: 'Y'
    }, {
        score: 5.6,
        address: 'DN11A, Romania',
        access: 1,
        latitude: 46.128466,
        name: 'UMB Adjud',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 177023,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 654195,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 3,
                id: 654194,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 13,
                id: 654023,
                power: 0
            }],
            id: 363428
        }],
        url: 'http://api.plugshare.com/view/location/177023',
        longitude: 27.158029,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'DN1 km. 373+100, Lancr\u0103m 515801',
        access: 1,
        latitude: 46.021837,
        name: 'Allegria SPA Hotel & Mercur Pavilion',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 191759,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 704430,
                power: 0
            }],
            id: 402001
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 704431,
                power: 0
            }],
            id: 402002
        }],
        url: 'http://api.plugshare.com/view/location/191759',
        longitude: 23.542878,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'Bulevardul 1 Decembrie 1918 242, T\u00e2rgu Mure\u0219 540509, Romania',
        access: 1,
        latitude: 46.531227,
        name: 'MOL',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 226415,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1260010,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 1260009,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1217593,
                power: 0
            }],
            id: 494827
        }],
        url: 'http://api.plugshare.com/view/location/226415',
        longitude: 24.592966,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Strada Gheorghe Doja 66, T\u00e2rgu Mure\u0219 540146, Romania',
        access: 1,
        latitude: 46.530198,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 141603,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1105348,
                power: 0
            }],
            id: 477685
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1105349,
                power: 0
            }],
            id: 477684
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1105345,
                power: 0
            }],
            id: 477683
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1091412,
                power: 0
            }],
            id: 476051
        }],
        url: 'http://api.plugshare.com/view/location/141603',
        longitude: 24.548069,
        icon_type: 'Y'
    }, {
        address: 'E581, Leuseni, Hancesti, Moldova',
        access: 1,
        latitude: 46.829589,
        name: 'EVPOINT Moldova, Leuseni, EV0010 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218050,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077785,
                power: 0
            }],
            id: 474488
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077784,
                power: 0
            }],
            id: 474487
        }],
        url: 'http://api.plugshare.com/view/location/218050',
        longitude: 28.196677,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Bulevardul Republicii Nr, 138, Ploiesti Prahova',
        access: 1,
        latitude: 44.955929,
        name: 'Kaufland Ploiesti',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 85624,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1448998,
                power: 0
            }],
            id: 534834
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1448993,
                power: 0
            }],
            id: 534833
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1250779,
                power: 0
            }],
            id: 476200
        }],
        url: 'http://api.plugshare.com/view/location/85624',
        longitude: 25.992616,
        icon_type: 'Y'
    }, {
        address: 'Aleea Sinaia 138-140, DN71 Km 6, Romania',
        access: 1,
        latitude: 44.964802,
        name: 'Raiman Autotreviso / Hyundai',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 238345,
        stations: [{
            network_id: 52,
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1295651,
                power: 0
            }],
            id: 516527
        }],
        url: 'http://api.plugshare.com/view/location/238345',
        longitude: 25.438997,
        icon_type: 'G'
    }, {
        score: 8.2,
        address: 'DN1 km. 68, E60, P\u0103ule\u0219ti, Romania',
        access: 1,
        latitude: 44.974843,
        name: 'ETU Paulesti',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 124427,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 689621,
                power: 0
            }],
            id: 390571
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 468163,
                power: 0
            }],
            id: 221593
        }],
        url: 'http://api.plugshare.com/view/location/124427',
        longitude: 25.945189,
        icon_type: 'GR'
    }, {
        score: 8.8,
        address: 'Calea Moldovei 32, Foc\u0219ani 620157, Romania',
        access: 1,
        latitude: 45.703474,
        name: 'Focsani Mall',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 210744,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1284505,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1284504,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1284503,
                power: 0
            }],
            id: 513238
        }],
        url: 'http://api.plugshare.com/view/location/210744',
        longitude: 27.203746,
        icon_type: 'Y'
    }, {
        address: 'Unnamed Road, Teleac, Romania',
        access: 1,
        latitude: 46.086815,
        name: 'Theodora Golf',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 247087,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1460174,
                power: 0
            }],
            id: 537424
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1460173,
                power: 0
            }],
            id: 537423
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1460172,
                power: 0
            }],
            id: 537422
        }],
        url: 'http://api.plugshare.com/view/location/247087',
        longitude: 23.626175,
        icon_type: 'G'
    }, {
        score: 1.0,
        address: 'Piatra Neam\u0163, Rom\u00e2nia, Bd Decebal nr. 79',
        access: 1,
        latitude: 46.934606,
        name: 'E-CHARGE RENOVATIO SHOPPING CITY PIATRA NEAMT',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 245780,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1438614,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1438613,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1438612,
                power: 0
            }],
            id: 533408
        }],
        url: 'http://api.plugshare.com/view/location/245780',
        longitude: 26.34889,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'bd. Traian nr. 177, Piatra-Neam\u021b 610137',
        access: 1,
        latitude: 46.920857,
        name: 'MOL Piatra Neam\u021b Jud Neamt',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 187817,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319618,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1319617,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1091422,
                power: 0
            }],
            id: 476061
        }],
        url: 'http://api.plugshare.com/view/location/187817',
        longitude: 26.387261,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: '\u0219os. Bucium nr. 16, Ia\u0219i 700267',
        access: 1,
        latitude: 47.136069,
        name: 'Rompetrol',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 152979,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1160001,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1160000,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 565015,
                power: 0
            }],
            id: 293735
        }],
        url: 'http://api.plugshare.com/view/location/152979',
        longitude: 27.60768,
        icon_type: 'Y'
    }, {
        address: 'DJ248 11, Horpaz 707085, Rom\u00e2nia',
        access: 1,
        latitude: 47.104793,
        name: 'Lidl Lunca Cet\u0103\u021buii',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 243363,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1399787,
                power: 0
            }, {
                kilowatts: null,
                connector: 10,
                id: 1399786,
                power: 0
            }],
            id: 527599
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1399785,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 1399784,
                power: 0
            }],
            id: 527598
        }],
        url: 'http://api.plugshare.com/view/location/243363',
        longitude: 27.559896,
        icon_type: 'G'
    }, {
        address: 'DJ107C 42, Ciugud',
        access: 1,
        latitude: 46.047297,
        name: 'Prim\u0103ria Ciugud',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 225019,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1200226,
                power: 0
            }],
            id: 491563
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1200225,
                power: 0
            }],
            id: 491562
        }],
        url: 'http://api.plugshare.com/view/location/225019',
        longitude: 23.613074,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'E85, Nicolae B\u0103lcescu, Romania',
        access: 1,
        latitude: 46.491439,
        name: 'Penny Logistic',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 195895,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1091430,
                power: 0
            }],
            id: 476069
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1091429,
                power: 0
            }],
            id: 476068
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 721807,
                power: 0
            }],
            id: 413577
        }],
        url: 'http://api.plugshare.com/view/location/195895',
        longitude: 26.922788,
        icon_type: 'Y'
    }, {
        address: 'DN1 KM 305+500, \u0218elimb\u0103r 557260, Romania',
        access: 1,
        latitude: 45.770073,
        name: 'MECATRONICS SIBIU',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 217209,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1057923,
                power: 0
            }],
            id: 472251
        }],
        url: 'http://api.plugshare.com/view/location/217209',
        longitude: 24.180061,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Bradului nr. 28, Sovata 545500',
        access: 1,
        latitude: 46.599552,
        name: 'Hotel Szeifert',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 198876,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 732047,
                power: 0
            }],
            id: 421333
        }],
        url: 'http://api.plugshare.com/view/location/198876',
        longitude: 25.082771,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'DN 28 km. 10, Uricani 707316',
        access: 1,
        latitude: 47.182996,
        name: 'Renault Bras',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 114949,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 430653,
                power: 0
            }],
            id: 198015
        }],
        url: 'http://api.plugshare.com/view/location/114949',
        longitude: 27.465466,
        icon_type: 'G'
    }, {
        address: 'Str Stelelor 1-3, Arad, Romania',
        access: 1,
        latitude: 46.140654,
        name: 'Polach',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 219119,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1103054,
                power: 0
            }],
            id: 477326
        }],
        url: 'http://api.plugshare.com/view/location/219119',
        longitude: 21.301383,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Avram Iancu 62, Brasov',
        access: 1,
        latitude: 45.658166,
        name: 'Kaufland Avram Iancu',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 116854,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1189823,
                power: 0
            }],
            id: 489779
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1096443,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1096442,
                power: 0
            }],
            id: 476590
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1096448,
                power: 0
            }],
            id: 358021
        }],
        url: 'http://api.plugshare.com/view/location/116854',
        longitude: 25.588704,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Strada Zaharia Stancu 1, Bra\u0219ov 500167, Romania',
        access: 1,
        latitude: 45.671796,
        name: 'Coresi Shopping Center',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 200570,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1096453,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1096452,
                power: 0
            }],
            id: 425714
        }],
        url: 'http://api.plugshare.com/view/location/200570',
        longitude: 25.615402,
        icon_type: 'Y'
    }, {
        score: 1.5,
        address: 'calea Mo\u021bilor nr. 120, Alba Iulia 510065',
        access: 1,
        latitude: 46.081638,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 111455,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1105362,
                power: 0
            }],
            id: 477688
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1105363,
                power: 0
            }],
            id: 477687
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1093355,
                power: 0
            }],
            id: 308041
        }],
        url: 'http://api.plugshare.com/view/location/111455',
        longitude: 23.563035,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Abatorului, nr. 5',
        access: 1,
        latitude: 46.573061,
        name: 'Dedeman Bacau',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 131666,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1457747,
                power: 0
            }],
            id: 536791
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 497137,
                power: 0
            }],
            id: 239940
        }],
        url: 'http://api.plugshare.com/view/location/131666',
        longitude: 26.883274,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada F\u0103g\u0103ra\u015fului 37, Re\u0219i\u021ba, Rom\u00e2nia',
        access: 1,
        latitude: 45.331381,
        name: 'Lidl Re\u0219i\u021ba ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 212119,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 930793,
                power: 0
            }],
            id: 455660
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 930792,
                power: 0
            }],
            id: 455659
        }],
        url: 'http://api.plugshare.com/view/location/212119',
        longitude: 21.868728,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Pet\u0151fi S\u00e1ndor 150, Dumbr\u0103vi\u021ba, Romania',
        access: 1,
        latitude: 45.791864,
        name: 'Lidl',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 97393,
        stations: [{
            outlets: [{
                kilowatts: 43.0,
                connector: 7,
                id: 599147,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 13,
                id: 875033,
                power: 0
            }, {
                kilowatts: 50.0,
                connector: 3,
                id: 875032,
                power: 0
            }],
            id: 319950
        }],
        url: 'http://api.plugshare.com/view/location/97393',
        longitude: 21.2387,
        icon_type: 'Y'
    }, {
        address: 'Strada Mihai Viteazul 31, Cahul, Moldova',
        access: 1,
        latitude: 45.895204,
        name: 'Ecofactor MOLDOVA (Cahul) ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 225651,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1209553,
                power: 0
            }],
            id: 493186
        }],
        url: 'http://api.plugshare.com/view/location/225651',
        longitude: 28.205228,
        icon_type: 'G'
    }, {
        address: 'sos. Scheia 76, Cahul, Moldova',
        access: 1,
        latitude: 45.920441,
        name: 'EVPOINT Moldova, Cahul, EV0013, (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218041,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077742,
                power: 0
            }],
            id: 474467
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077741,
                power: 0
            }],
            id: 474466
        }],
        url: 'http://api.plugshare.com/view/location/218041',
        longitude: 28.193129,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Veteranilor 107,Buzau',
        access: 1,
        latitude: 45.157062,
        name: 'MCM PETROL',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 149829,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1096827,
                power: 0
            }],
            id: 476640
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1096828,
                power: 0
            }],
            id: 476639
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1089011,
                power: 0
            }],
            id: 475705
        }],
        url: 'http://api.plugshare.com/view/location/149829',
        longitude: 26.79118,
        icon_type: 'Y'
    }, {
        address: 'Strada Uzinelor 206, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 46.985756,
        name: 'Godspeed SRL',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 188636,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 693723,
                power: 0
            }],
            id: 393779
        }, {
            outlets: [{
                kilowatts: null,
                connector: 15,
                id: 693722,
                power: 0
            }],
            id: 393778
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 693721,
                power: 0
            }],
            id: 393777
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 693720,
                power: 0
            }],
            id: 393776
        }],
        url: 'http://api.plugshare.com/view/location/188636',
        longitude: 28.916305,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'unirii',
        access: 1,
        latitude: 46.770534,
        name: 'Unirii Parking',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 164556,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 633579,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 633578,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 611216,
                power: 0
            }],
            id: 329767
        }],
        url: 'http://api.plugshare.com/view/location/164556',
        longitude: 23.589658,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'DN1B, Blejoi 107070, Rom\u00e2nia',
        access: 1,
        latitude: 44.986775,
        name: 'Lidl Blejoi',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 243774,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1411496,
                power: 0
            }],
            id: 529046
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1407368,
                power: 0
            }],
            id: 528609
        }],
        url: 'http://api.plugshare.com/view/location/243774',
        longitude: 26.012559,
        icon_type: 'G'
    }, {
        address: 'DJ102, Blejoi, Rom\u00e2nia',
        access: 1,
        latitude: 44.980868,
        name: 'Ecombustibil',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 194473,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 6,
                id: 1448987,
                power: 0
            }],
            id: 534829
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1448988,
                power: 0
            }],
            id: 409737
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 716875,
                power: 0
            }],
            id: 409736
        }],
        url: 'http://api.plugshare.com/view/location/194473',
        longitude: 25.987369,
        icon_type: 'G'
    }, {
        address: 'Strada Petru Rare\u0219 120, Arad 317206, Romania',
        access: 1,
        latitude: 46.199888,
        name: 'Lidl Station  (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 247754,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1468144,
                power: 0
            }],
            id: 540607
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1468143,
                power: 0
            }],
            id: 540606
        }],
        url: 'http://api.plugshare.com/view/location/247754',
        longitude: 21.339752,
        icon_type: 'GR'
    }, {
        address: 'str. Clujului nr. 15, Cluj-Napoca 400495',
        access: 1,
        latitude: 46.784033,
        name: 'RMB Inter Auto',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 203022,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 8,
                id: 759217,
                power: 0
            }],
            id: 431599
        }],
        url: 'http://api.plugshare.com/view/location/203022',
        longitude: 23.713312,
        icon_type: 'G'
    }, {
        score: 7.9,
        address: '\u0219os. P\u0103curari nr. 138, Ia\u0219i 700545',
        access: 1,
        latitude: 47.173225,
        name: 'IDEO - Centrul de afaceri',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 115551,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1114886,
                power: 0
            }],
            id: 478980
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1114885,
                power: 0
            }],
            id: 478979
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 674855,
                power: 0
            }],
            id: 379293
        }],
        url: 'http://api.plugshare.com/view/location/115551',
        longitude: 27.523327,
        icon_type: 'Y'
    }, {
        score: 7.2,
        address: '\u0219os. P\u0103curari nr. 177, Ia\u0219i 700544',
        access: 1,
        latitude: 47.174738,
        name: 'Casa Auto Ia\u0219i - Jaguar',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 191655,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 704038,
                power: 0
            }],
            id: 401725
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1115269,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1115268,
                power: 0
            }],
            id: 479038
        }],
        url: 'http://api.plugshare.com/view/location/191655',
        longitude: 27.500027,
        icon_type: 'Y'
    }, {
        address: 'VGP Warehouse, Building C1, Warehouse B1; calea Aviatorilor nr. 4, Ghiroda 307200',
        access: 1,
        latitude: 45.786978,
        name: 'Fancourier',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 173872,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 643370,
                power: 0
            }],
            id: 355078
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 643369,
                power: 0
            }],
            id: 355077
        }],
        url: 'http://api.plugshare.com/view/location/173872',
        longitude: 21.323656,
        icon_type: 'G'
    }, {
        address: 'Chisinau, str. Me\u015fterul Manole 2/3',
        access: 1,
        latitude: 47.031222,
        name: 'Eco Electro 2246 COMPLEX (112A)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 244729,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1425484,
                power: 0
            }],
            id: 530737
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1425486,
                power: 0
            }],
            id: 530739
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1425485,
                power: 0
            }],
            id: 530738
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1425487,
                power: 0
            }],
            id: 530740
        }],
        url: 'http://api.plugshare.com/view/location/244729',
        longitude: 28.88831,
        icon_type: 'Y'
    }, {
        score: 8.0,
        address: 'DN1, \u0218elimb\u0103r 557260, Romania',
        access: 1,
        latitude: 45.776652,
        name: 'Shopping City Sibiu Mall',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 237261,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1286884,
                power: 0
            }],
            id: 513989
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1286883,
                power: 0
            }],
            id: 513988
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1286882,
                power: 0
            }],
            id: 513987
        }],
        url: 'http://api.plugshare.com/view/location/237261',
        longitude: 24.171651,
        icon_type: 'Y'
    }, {
        score: 5.7,
        address: 'str. Damaschin Bojinca nr. 4, Timi\u0219oara 300216',
        access: 1,
        latitude: 45.739245,
        name: 'Kaufland (Elisabetin)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 91192,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 517375,
                power: 0
            }],
            id: 253446
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 517374,
                power: 0
            }],
            id: 253445
        }, {
            outlets: [{
                kilowatts: 50.0,
                connector: 13,
                id: 350594,
                power: 0
            }],
            id: 144646
        }],
        url: 'http://api.plugshare.com/view/location/91192',
        longitude: 21.2119,
        icon_type: 'Y'
    }, {
        score: 9.0,
        address: 'bd. Decebal nr. 79, Piatra-Neam\u021b 610058',
        access: 1,
        latitude: 46.934218,
        name: 'Shopping City Evconnect.ro',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 160966,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1448034,
                power: 0
            }],
            id: 534660
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1448033,
                power: 0
            }],
            id: 534659
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1448032,
                power: 0
            }],
            id: 534658
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1448031,
                power: 0
            }],
            id: 534657
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 1448030,
                power: 0
            }],
            id: 534656
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 599796,
                power: 0
            }],
            id: 320407
        }],
        url: 'http://api.plugshare.com/view/location/160966',
        longitude: 26.348715,
        icon_type: 'G'
    }, {
        address: 'str. Palermo nr. 1, Timi\u0219oara 300518',
        access: 1,
        latitude: 45.695629,
        name: 'PaulTrans SERVICE',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 185120,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 681030,
                power: 0
            }],
            id: 384039
        }],
        url: 'http://api.plugshare.com/view/location/185120',
        longitude: 21.177316,
        icon_type: 'G'
    }, {
        address: 'Calea Romanilor 47, Arad 310114, Romania',
        access: 1,
        latitude: 46.16138,
        name: 'Hotel Coandi',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 193740,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 714242,
                power: 0
            }],
            id: 407621
        }],
        url: 'http://api.plugshare.com/view/location/193740',
        longitude: 21.323156,
        icon_type: 'G'
    }, {
        address: 'Bulevardul Pandurilor nr. 1, T\u00e2rgu Mure\u0219 540494, Romania',
        access: 1,
        latitude: 46.533251,
        name: 'Parcare',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 230503,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1237410,
                power: 0
            }],
            id: 501878
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1237411,
                power: 0
            }],
            id: 501879
        }],
        url: 'http://api.plugshare.com/view/location/230503',
        longitude: 24.571767,
        icon_type: 'G'
    }, {
        score: 3.1,
        address: 'Gyula V\u00e1rkert utca',
        access: 1,
        latitude: 46.645077,
        name: 'Gyula, e-Mobi 2x22 kw AC',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 156642,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 582225,
                power: 0
            }],
            id: 306401
        }],
        url: 'http://api.plugshare.com/view/location/156642',
        longitude: 21.284738,
        icon_type: 'G'
    }, {
        address: 'Gyula, Zr\u00ednyi Mikl\u00f3s t\u00e9r 2, 5700, Hungary',
        access: 1,
        latitude: 46.640633,
        name: 'Penny Market (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 219372,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1109677,
                power: 0
            }],
            id: 478168
        }],
        url: 'http://api.plugshare.com/view/location/219372',
        longitude: 21.264411,
        icon_type: 'GR'
    }, {
        address: 'Calea Munteniei 11, Ceardac 620172, Rom\u00e2nia',
        access: 1,
        latitude: 45.684108,
        name: 'Auto SIMA BAYER',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 225645,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1209361,
                power: 0
            }],
            id: 493171
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1209360,
                power: 0
            }],
            id: 493170
        }],
        url: 'http://api.plugshare.com/view/location/225645',
        longitude: 27.195364,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'intrare str. Gh. Laz\u0103r (str. Gheorghe Dima nr. 1, Timi\u0219oara 300079)',
        access: 1,
        latitude: 45.75773,
        name: 'LEK3.CO HUB700',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 112060,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1071083,
                power: 0
            }],
            id: 473873
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1071079,
                power: 0
            }],
            id: 473869
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 614807,
                power: 0
            }],
            id: 332645
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 439982,
                power: 0
            }],
            id: 191011
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 682363,
                power: 0
            }],
            id: 385173
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 682362,
                power: 0
            }],
            id: 385172
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 676918,
                power: 0
            }],
            id: 380841
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 614808,
                power: 0
            }],
            id: 332646
        }],
        url: 'http://api.plugshare.com/view/location/112060',
        longitude: 21.224248,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Calea Bor\u0219ului 6, Oradea, Rom\u00e1nia',
        access: 1,
        latitude: 47.074416,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 213334,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1469813,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1469812,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 955989,
                power: 0
            }],
            id: 458562
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 955988,
                power: 0
            }],
            id: 458561
        }],
        url: 'http://api.plugshare.com/view/location/213334',
        longitude: 21.902606,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Strada Sovata',
        access: 1,
        latitude: 47.06579,
        name: 'Penny',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 176524,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 742716,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 742715,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 653334,
                power: 0
            }],
            id: 362947
        }],
        url: 'http://api.plugshare.com/view/location/176524',
        longitude: 21.920603,
        icon_type: 'Y'
    }, {
        address: 'Strada Muscelului Nr.12, Predelu\u021b 507026, Rom\u00e2nia',
        access: 1,
        latitude: 45.531213,
        name: 'Inspire View ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 195325,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 719706,
                power: 0
            }],
            id: 412090
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 719705,
                power: 0
            }],
            id: 412089
        }],
        url: 'http://api.plugshare.com/view/location/195325',
        longitude: 25.356868,
        icon_type: 'G'
    }, {
        score: 8.0,
        address: 'str. Teodor R\u00e2\u0219canu nr. 6A, Ia\u0219i 700010',
        access: 1,
        latitude: 47.160556,
        name: 'Kaufland (Alexandru cel Bun)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 94125,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1110285,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1110284,
                power: 0
            }],
            id: 478332
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 607946,
                power: 0
            }],
            id: 327024
        }],
        url: 'http://api.plugshare.com/view/location/94125',
        longitude: 27.575572,
        icon_type: 'Y'
    }, {
        score: 9.3,
        address: 'Str. P\u0103curari Nr. 97-99, Ia\u0219i 700525',
        access: 1,
        latitude: 47.172948,
        name: 'MOL P\u0103curari Jud. Iasi',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 181845,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319528,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1319527,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1106574,
                power: 0
            }],
            id: 477805
        }],
        url: 'http://api.plugshare.com/view/location/181845',
        longitude: 27.56047,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Calea Republicii, nr. 100-102',
        access: 1,
        latitude: 46.528712,
        name: 'Rompetrol 2 Bac\u0103u',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 151948,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 560455,
                power: 0
            }],
            id: 289943
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1091432,
                power: 0
            }],
            id: 476071
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1091431,
                power: 0
            }],
            id: 476070
        }],
        url: 'http://api.plugshare.com/view/location/151948',
        longitude: 26.920174,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'Bac\u0103u, Rom\u00e2nia, Calea Republicii nr. 181',
        access: 1,
        latitude: 46.511246,
        name: 'HELLO SHOPPING PARK',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 231091,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1244099,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1244098,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1244097,
                power: 0
            }],
            id: 503661
        }],
        url: 'http://api.plugshare.com/view/location/231091',
        longitude: 26.926813,
        icon_type: 'Y'
    }, {
        address: 'Strada Or\u0103\u0219tiei 10, Cluj-Napoca, Rom\u00e2nia',
        access: 1,
        latitude: 46.780053,
        name: 'Transilvania Constructii Cluj',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 237274,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1286988,
                power: 0
            }],
            id: 514021
        }],
        url: 'http://api.plugshare.com/view/location/237274',
        longitude: 23.662037,
        icon_type: 'G'
    }, {
        address: 'str. Hella Corporate, Giarmata 307210',
        access: 1,
        latitude: 45.816048,
        name: 'Hella - Employee Parking',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 155504,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 572746,
                power: 0
            }],
            id: 300312
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 572747,
                power: 0
            }],
            id: 300313
        }],
        url: 'http://api.plugshare.com/view/location/155504',
        longitude: 21.282803,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: '5600 B\u00e9k\u00e9scsaba, Kolozsv\u00e1ri utca 24.',
        access: 1,
        latitude: 46.668137,
        name: 'B\u00e9k\u00e9scsaba, J\u00e9zus Sz\u00edve Templom, 10018 - Mobiliti',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 165030,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 673088,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 613039,
                power: 0
            }],
            id: 331415
        }],
        url: 'http://api.plugshare.com/view/location/165030',
        longitude: 21.067203,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'bd. Muncii nr. 289, Cluj-Napoca 400641',
        access: 1,
        latitude: 46.796985,
        name: 'Medisprof',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 161860,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 602800,
                power: 0
            }],
            id: 322959
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 602801,
                power: 0
            }],
            id: 322960
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 602802,
                power: 0
            }],
            id: 322961
        }],
        url: 'http://api.plugshare.com/view/location/161860',
        longitude: 23.660985,
        icon_type: 'G'
    }, {
        address: 'DJ173A, Romania',
        access: 1,
        latitude: 47.170799,
        name: 'Roser House',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 243033,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1383467,
                power: 0
            }],
            id: 526738
        }],
        url: 'http://api.plugshare.com/view/location/243033',
        longitude: 24.886861,
        icon_type: 'G'
    }, {
        address: 'Strada Grenoble 134/3, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 46.973541,
        name: 'EVPOINT Moldova, Chisinau, EV0025 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218034,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077639,
                power: 0
            }],
            id: 474452
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077638,
                power: 0
            }],
            id: 474451
        }],
        url: 'http://api.plugshare.com/view/location/218034',
        longitude: 28.847421,
        icon_type: 'G'
    }, {
        score: 9.6,
        address: 'str. Nuf\u0103rului nr. 111, Oradea 410597',
        access: 1,
        latitude: 47.024539,
        name: 'SOCAR (Nuf\u0103rului)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 188722,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1115567,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 693980,
                power: 0
            }],
            id: 393969
        }],
        url: 'http://api.plugshare.com/view/location/188722',
        longitude: 21.958596,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Mihail Kog\u0103lniceanu nr. 61, Sebe\u0219 515800',
        access: 1,
        latitude: 45.976342,
        name: 'TransIvinis - Partener Rompetrol',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 184692,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 679612,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 679611,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 679610,
                power: 0
            }],
            id: 382895
        }],
        url: 'http://api.plugshare.com/view/location/184692',
        longitude: 23.557463,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Augustin Bena nr. 88, Sebe\u0219 515800',
        access: 1,
        latitude: 45.961142,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 100204,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 386230,
                power: 0
            }],
            id: 166824
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 584445,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 584446,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 584447,
                power: 0
            }],
            id: 308040
        }],
        url: 'http://api.plugshare.com/view/location/100204',
        longitude: 23.551567,
        icon_type: 'Y'
    }, {
        address: 'Petricani 32',
        access: 1,
        latitude: 47.054605,
        name: 'EcoFactor Moldova 900095 (TIREX)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 230094,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1232580,
                power: 0
            }],
            id: 500985
        }],
        url: 'http://api.plugshare.com/view/location/230094',
        longitude: 28.80902,
        icon_type: 'G'
    }, {
        score: 8.0,
        address: 'R\u00e2mnicu V\u00e2lcea, Romania',
        access: 1,
        latitude: 45.111411,
        name: 'Shopping City R\u00e2mnicu Valcea',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 140789,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 530855,
                power: 0
            }],
            id: 264542
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 530856,
                power: 0
            }],
            id: 264543
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 530857,
                power: 0
            }],
            id: 264544
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 530858,
                power: 0
            }],
            id: 264545
        }],
        url: 'http://api.plugshare.com/view/location/140789',
        longitude: 24.381912,
        icon_type: 'G'
    }, {
        address: 'B\u00e9k\u00e9scsaba, F\u00f6venyes u. 2, 5600 Magyarorsz\u00e1g',
        access: 1,
        latitude: 46.666514,
        name: 'B\u00e9k\u00e9scsaba, Lencs\u00e9si \u00c1ltal\u00e1nos Iskola, 10019 - Mobiliti',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 182601,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 673083,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 673082,
                power: 0
            }],
            id: 378034
        }],
        url: 'http://api.plugshare.com/view/location/182601',
        longitude: 21.115376,
        icon_type: 'G'
    }, {
        score: 8.0,
        address: '5600 B\u00e9k\u00e9scsaba, Gyulai utca 30.',
        access: 1,
        latitude: 46.681911,
        name: 'B\u00e9k\u00e9scsaba, Sportcsarnok, 10017 - Mobiliti',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 165029,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 673084,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 613038,
                power: 0
            }],
            id: 331414
        }],
        url: 'http://api.plugshare.com/view/location/165029',
        longitude: 21.113869,
        icon_type: 'G'
    }, {
        score: 8.4,
        address: 'Calea Zarandului 87, Romania',
        access: 1,
        latitude: 45.861866,
        name: 'Shopping City Deva',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 223092,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1176177,
                power: 0
            }],
            id: 487394
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1176176,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1176175,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1176174,
                power: 0
            }],
            id: 487393
        }],
        url: 'http://api.plugshare.com/view/location/223092',
        longitude: 22.92872,
        icon_type: 'Y'
    }, {
        address: 'Strada Independen\u021bei 7, Oradea, Rom\u00e2nia',
        access: 1,
        latitude: 47.055066,
        name: 'Parcare Subterana Independentei (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/YR.png',
        id: 247444,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1464294,
                power: 0
            }],
            id: 538301
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1464293,
                power: 0
            }],
            id: 538300
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1464292,
                power: 0
            }],
            id: 538299
        }],
        url: 'http://api.plugshare.com/view/location/247444',
        longitude: 21.930939,
        icon_type: 'YR'
    }, {
        score: 7.9,
        address: 'Strada P\u0103durii 19, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 46.980525,
        name: 'Volta',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 160953,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 599758,
                power: 0
            }],
            id: 320380
        }],
        url: 'http://api.plugshare.com/view/location/160953',
        longitude: 28.890687,
        icon_type: 'GR'
    }, {
        score: 10.0,
        address: 'calea \u0218agului nr. 100, Timi\u0219oara 300516',
        access: 1,
        latitude: 45.724153,
        name: 'Shopping City',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 84905,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 650102,
                power: 0
            }],
            id: 360303
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 650101,
                power: 0
            }],
            id: 360302
        }],
        url: 'http://api.plugshare.com/view/location/84905',
        longitude: 21.200607,
        icon_type: 'G'
    }, {
        score: 7.9,
        address: 'calea \u0218agului nr. 146, Timi\u0219oara 307221',
        access: 1,
        latitude: 45.712613,
        name: 'Auto Europa (\u0218agului)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 139817,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 527260,
                power: 0
            }],
            id: 261701
        }],
        url: 'http://api.plugshare.com/view/location/139817',
        longitude: 21.191409,
        icon_type: 'G'
    }, {
        address: 'R2, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 46.965862,
        name: 'Ecofactor Moldova (METRO 2)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 241105,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1347475,
                power: 0
            }],
            id: 523487
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1347474,
                power: 0
            }],
            id: 523486
        }],
        url: 'http://api.plugshare.com/view/location/241105',
        longitude: 28.890103,
        icon_type: 'G'
    }, {
        address: 'str. Magaziei nr. 19, Cluj-Napoca 400178',
        access: 1,
        latitude: 46.781358,
        name: 'Hotel ARY',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 164904,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 612545,
                power: 0
            }],
            id: 330970
        }],
        url: 'http://api.plugshare.com/view/location/164904',
        longitude: 23.57954,
        icon_type: 'G'
    }, {
        score: 1.5,
        address: 'str. G\u0103rii nr. 21, Cluj-Napoca 400267',
        access: 1,
        latitude: 46.787895,
        name: 'Liberty Technology Park',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 68111,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 230441,
                power: 0
            }],
            id: 96028
        }],
        url: 'http://api.plugshare.com/view/location/68111',
        longitude: 23.594101,
        icon_type: 'GR'
    }, {
        score: 10.0,
        address: 'DJ582D, V\u0103liug 327415, Rom\u00e2nia',
        access: 1,
        latitude: 45.217333,
        name: 'LEK3.CO-Ponton Casa Baraj',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 236477,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1279826,
                power: 0
            }],
            id: 511899
        }],
        url: 'http://api.plugshare.com/view/location/236477',
        longitude: 22.026329,
        icon_type: 'G'
    }, {
        address: 'Strada Matei Basarab, 29, 105500, Romania',
        access: 1,
        latitude: 45.419921,
        name: 'Kalinderu ski slope',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 221517,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1151662,
                power: 0
            }],
            id: 483676
        }],
        url: 'http://api.plugshare.com/view/location/221517',
        longitude: 25.524852,
        icon_type: 'G'
    }, {
        score: 8.6,
        address: 'Sibiu, \u0218oseaua Alba Iulia 42',
        access: 1,
        latitude: 45.793918,
        name: 'Kaufland - \u0218oseaua Alba Iulia',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 93004,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1444139,
                power: 0
            }],
            id: 534471
        }, {
            network_id: 52,
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1444138,
                power: 0
            }],
            id: 534470
        }, {
            network_id: 52,
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1444137,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1444136,
                power: 0
            }],
            id: 148396
        }],
        url: 'http://api.plugshare.com/view/location/93004',
        longitude: 24.13362,
        icon_type: 'Y'
    }, {
        address: 'bd. Grivi\u021bei nr. 2F-2G, Bra\u0219ov 500182',
        access: 1,
        latitude: 45.673679,
        name: 'Complex Paradisul Acvatic',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 166581,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 617992,
                power: 0
            }],
            id: 335252
        }],
        url: 'http://api.plugshare.com/view/location/166581',
        longitude: 25.587247,
        icon_type: 'G'
    }, {
        address: 'Str. M. Viteazul 18/1, Chisinau, Moldova',
        access: 1,
        latitude: 47.039501,
        name: 'Bemol Gas Station',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218035,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1077645,
                power: 0
            }],
            id: 474454
        }, {
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1077644,
                power: 0
            }],
            id: 474453
        }],
        url: 'http://api.plugshare.com/view/location/218035',
        longitude: 28.827908,
        icon_type: 'G'
    }, {
        score: 7.0,
        address: 'bd. Revolu\u021biei nr. 79-81, Arad 310025',
        access: 1,
        latitude: 46.174275,
        name: 'Hotel Continental Arad',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 202477,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 755686,
                power: 0
            }],
            id: 430171
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 755685,
                power: 0
            }],
            id: 430170
        }],
        url: 'http://api.plugshare.com/view/location/202477',
        longitude: 21.318214,
        icon_type: 'G'
    }, {
        score: 4.9,
        address: 'Strada Avram Iancu 7, Sinaia 106100, Rom\u00e2nia',
        access: 1,
        latitude: 45.344618,
        name: 'Hotel International Sinaia',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 189013,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 694835,
                power: 0
            }],
            id: 394666
        }],
        url: 'http://api.plugshare.com/view/location/189013',
        longitude: 25.546798,
        icon_type: 'G'
    }, {
        address: 'Aleea \u0218trandului 9, Oradea 410051, Romania',
        access: 1,
        latitude: 47.054405,
        name: 'Hotel Doubletree By Hilton',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 204022,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 770923,
                power: 0
            }],
            id: 433978
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 770922,
                power: 0
            }],
            id: 433977
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 770921,
                power: 0
            }],
            id: 433976
        }],
        url: 'http://api.plugshare.com/view/location/204022',
        longitude: 21.948704,
        icon_type: 'G'
    }, {
        score: 1.0,
        address: 'bd. Eroilor de la Tisa nr. 38, Timi\u0219oara 300562',
        access: 1,
        latitude: 45.750108,
        name: 'Lidl (Buzia\u0219ului)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 226104,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1214451,
                power: 0
            }],
            id: 494252
        }],
        url: 'http://api.plugshare.com/view/location/226104',
        longitude: 21.252273,
        icon_type: 'G'
    }, {
        address: 'Parcul Pet\u0151fi S\u00e1ndor 16, Oradea 410160, Romania',
        access: 1,
        latitude: 47.065295,
        name: 'Hotel Stokker',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 205024,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 789742,
                power: 0
            }],
            id: 436501
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 789743,
                power: 0
            }],
            id: 436502
        }],
        url: 'http://api.plugshare.com/view/location/205024',
        longitude: 21.934589,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'str.Varnita 10/2',
        access: 1,
        latitude: 46.995266,
        name: 'ODESKABEL MOLDOVA',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 183800,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 680539,
                power: 0
            }],
            id: 383673
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 676840,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 676563,
                power: 0
            }],
            id: 380566
        }],
        url: 'http://api.plugshare.com/view/location/183800',
        longitude: 28.89162,
        icon_type: 'G'
    }, {
        score: 5.7,
        address: 'Strada Uzinelor 12/10, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 47.00535,
        name: 'Romstal Moldova',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 109956,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 412007,
                power: 0
            }],
            id: 185665
        }],
        url: 'http://api.plugshare.com/view/location/109956',
        longitude: 28.885213,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Bulevardul Muncii 15, Cluj-Napoca 400641',
        access: 1,
        latitude: 46.799064,
        name: 'Auchan Iris',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 210455,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 894173,
                power: 0
            }],
            id: 451085
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 894172,
                power: 0
            }],
            id: 451084
        }],
        url: 'http://api.plugshare.com/view/location/210455',
        longitude: 23.611137,
        icon_type: 'G'
    }, {
        address: 'calea Lugojului nr. 93, Ghiroda 307200',
        access: 1,
        latitude: 45.775903,
        name: 'Autoclub',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 120924,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 454132,
                power: 0
            }],
            id: 212918
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 454131,
                power: 0
            }],
            id: 212917
        }],
        url: 'http://api.plugshare.com/view/location/120924',
        longitude: 21.303518,
        icon_type: 'G'
    }, {
        score: 4.1,
        address: 'bd. Ioni\u021b\u0103 Sandu Sturza nr. 2, Bac\u0103u 600268',
        access: 1,
        latitude: 46.56561,
        name: 'Hotel Decebal',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 128138,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 952407,
                power: 0
            }],
            id: 458247
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 482424,
                power: 0
            }],
            id: 231533
        }],
        url: 'http://api.plugshare.com/view/location/128138',
        longitude: 26.911163,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'DN67 52, R\u00e2mnicu V\u00e2lcea 240501, Romania',
        access: 1,
        latitude: 45.073071,
        name: 'Nurvil Audi',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 91044,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 349980,
                power: 0
            }],
            id: 144371
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 571510,
                power: 0
            }],
            id: 299294
        }],
        url: 'http://api.plugshare.com/view/location/91044',
        longitude: 24.349629,
        icon_type: 'G'
    }, {
        score: 8.6,
        address: '38 DN64, Raureni, R\u00e2mnicu V\u00e2lcea 240475, Romania',
        access: 1,
        latitude: 45.06666,
        name: 'Nurvil VW Dealer',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 91043,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1440387,
                power: 0
            }],
            id: 533709
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1437085,
                power: 0
            }],
            id: 533068
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 571511,
                power: 0
            }],
            id: 299295
        }],
        url: 'http://api.plugshare.com/view/location/91043',
        longitude: 24.34035,
        icon_type: 'Y'
    }, {
        address: 'Bulevardul Dacia 137, Mioveni 115400, Rom\u00e2nia',
        access: 1,
        latitude: 44.951556,
        name: 'Lidl Mioveni',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 243629,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1403644,
                power: 0
            }],
            id: 528197
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1403643,
                power: 0
            }],
            id: 528196
        }],
        url: 'http://api.plugshare.com/view/location/243629',
        longitude: 24.926392,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Duiliu Zamfirescu 8, Oradea, Romania',
        access: 1,
        latitude: 47.056174,
        name: 'Compania de Apa',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 216754,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1045725,
                power: 0
            }],
            id: 471139
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1045724,
                power: 0
            }],
            id: 471138
        }],
        url: 'http://api.plugshare.com/view/location/216754',
        longitude: 21.925948,
        icon_type: 'G'
    }, {
        address: 'Str. Principala, 200, Com. Bors, Bihor, Bor\u0219, Rom\u00e1nia',
        access: 1,
        latitude: 47.115352,
        name: 'Prim\u0103rie Bors',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 244240,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1417891,
                power: 0
            }],
            id: 529745
        }],
        url: 'http://api.plugshare.com/view/location/244240',
        longitude: 21.810821,
        icon_type: 'G'
    }, {
        address: 'Tts "Del\u02b9ta", 25-\u0411 68600, \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041c\u0438\u0440\u0443, 25-\u0411, \u0406\u0437\u043c\u0430\u0457\u043b, \u041e\u0434\u0435\u0441\u044c\u043a\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c, 68601',
        access: 1,
        latitude: 45.354696,
        name: '2220 ElectroUA / Pizza Celentano & Potato House',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 212138,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 931292,
                power: 0
            }],
            id: 455693
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 931291,
                power: 0
            }],
            id: 455692
        }],
        url: 'http://api.plugshare.com/view/location/212138',
        longitude: 28.829571,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: '5, Chi\u0219in\u0103u 4839, r.Moldova',
        access: 1,
        latitude: 47.065438,
        name: 'Ecofactor Moldova (METRO)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 182876,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1374396,
                power: 0
            }],
            id: 526010
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1374395,
                power: 0
            }],
            id: 526009
        }],
        url: 'http://api.plugshare.com/view/location/182876',
        longitude: 28.854338,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'Strada Nicolae Titulescu 8, Sighi\u0219oara 545400, Romania',
        access: 1,
        latitude: 46.225165,
        name: 'Hotel Imperial',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 216862,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1048455,
                power: 0
            }],
            id: 471437
        }],
        url: 'http://api.plugshare.com/view/location/216862',
        longitude: 24.798159,
        icon_type: 'G'
    }, {
        address: 'Grigore Vieru Blvd 22/1, Chisinau, Moldova',
        access: 1,
        latitude: 47.038031,
        name: 'Bemol Gas Station',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218022,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1077394,
                power: 0
            }],
            id: 474414
        }, {
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1077393,
                power: 0
            }],
            id: 474413
        }],
        url: 'http://api.plugshare.com/view/location/218022',
        longitude: 28.851554,
        icon_type: 'G'
    }, {
        score: 8.4,
        address: 'Strada Liviu Deleanu 7/4, Chi\u0219in\u0103u 2071, Moldova',
        access: 1,
        latitude: 47.045778,
        name: 'EcoFactor MOLDOVA 920020 (Vento SAC-2)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 185738,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 683092,
                power: 0
            }],
            id: 385712
        }],
        url: 'http://api.plugshare.com/view/location/185738',
        longitude: 28.76987,
        icon_type: 'G'
    }, {
        address: 'str. prof. Ion Paul nr. 2A, Ia\u0219i 700302',
        access: 1,
        latitude: 47.165135,
        name: 'Metropolitan Iassium Luxury Suites',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 153253,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 565023,
                power: 0
            }],
            id: 293741
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 565024,
                power: 0
            }],
            id: 293742
        }],
        url: 'http://api.plugshare.com/view/location/153253',
        longitude: 27.596625,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'str. Petricani 3',
        access: 1,
        latitude: 47.040952,
        name: 'EcoFactor MOLDOVA 980077 (Saltica Lux)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 209067,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 866426,
                power: 0
            }],
            id: 447454
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 866425,
                power: 0
            }],
            id: 447453
        }],
        url: 'http://api.plugshare.com/view/location/209067',
        longitude: 28.841697,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: '\u0218oseaua Alba Iulia 69, Sibiu 550052, Romania',
        access: 1,
        latitude: 45.792011,
        name: 'Autoklass Sibiu',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 66974,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 861023,
                power: 0
            }],
            id: 446888
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 861022,
                power: 0
            }],
            id: 446887
        }],
        url: 'http://api.plugshare.com/view/location/66974',
        longitude: 24.107168,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Calomfirescu nr. 2, Ploie\u0219ti 100176',
        access: 1,
        latitude: 44.946427,
        name: 'AFI Ploiesti',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 136067,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 969533,
                power: 0
            }],
            id: 460259
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 969532,
                power: 0
            }],
            id: 460258
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 513701,
                power: 0
            }],
            id: 251447
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 513700,
                power: 0
            }],
            id: 251446
        }],
        url: 'http://api.plugshare.com/view/location/136067',
        longitude: 26.031579,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Observatorului nr. 129, Cluj-Napoca 400352',
        access: 1,
        latitude: 46.751967,
        name: 'Golden Tulip Ana Dome Hotel Cluj-Napoca',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 120481,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 635434,
                power: 0
            }],
            id: 348764
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 452333,
                power: 0
            }],
            id: 211680
        }],
        url: 'http://api.plugshare.com/view/location/120481',
        longitude: 23.576668,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Nuf\u0103rului 28J, Oradea 410583, Romania',
        access: 1,
        latitude: 47.03638,
        name: 'Lidl ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 219368,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1109536,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 1109535,
                power: 0
            }],
            id: 478141
        }],
        url: 'http://api.plugshare.com/view/location/219368',
        longitude: 21.946948,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Zamorei 1, Bu\u0219teni 105500, Romania',
        access: 1,
        latitude: 45.41408,
        name: 'Polyfazer - Castelul Cantacuzino, Busteni',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 155618,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 573019,
                power: 0
            }],
            id: 300537
        }],
        url: 'http://api.plugshare.com/view/location/155618',
        longitude: 25.542579,
        icon_type: 'G'
    }, {
        score: 8.4,
        address: 'Strada S\u00e2ntimbru 18, Odorheiu Secuiesc 535600, Rom\u00e2nia',
        access: 1,
        latitude: 46.302675,
        name: 'Gond\u0171z\u0151 Hotel & Restaurant',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 189836,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 697711,
                power: 0
            }],
            id: 396841
        }],
        url: 'http://api.plugshare.com/view/location/189836',
        longitude: 25.298137,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Calea Gu\u0219teri\u021bei, Sibiu 45.801987,24.169740',
        access: 1,
        latitude: 45.802294,
        name: 'Penny Market - Calea Gu\u0219teri\u021bei',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 213066,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1104697,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1104696,
                power: 0
            }],
            id: 477622
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 949668,
                power: 0
            }],
            id: 457887
        }],
        url: 'http://api.plugshare.com/view/location/213066',
        longitude: 24.169876,
        icon_type: 'Y'
    }, {
        score: 8.2,
        address: 'Bulevardul Corneliu Coposu intersec\u021bie cu Str. Lector',
        access: 1,
        latitude: 45.797331,
        name: 'Promenada Mall  ',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 214740,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1114782,
                power: 0
            }],
            id: 478974
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1095815,
                power: 0
            }],
            id: 476529
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1095814,
                power: 0
            }],
            id: 462487
        }],
        url: 'http://api.plugshare.com/view/location/214740',
        longitude: 24.162925,
        icon_type: 'Y'
    }, {
        score: 7.9,
        address: 'str. Divizia 9 Cavalerie nr. 19, Timi\u0219oara 300264',
        access: 1,
        latitude: 45.768697,
        name: 'SOCAR (Complex Euro/Dedeman)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 170389,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 636037,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 636036,
                power: 0
            }],
            id: 349267
        }],
        url: 'http://api.plugshare.com/view/location/170389',
        longitude: 21.234876,
        icon_type: 'G'
    }, {
        score: 8.6,
        address: 'Strada Calea Ie\u015filor 77, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 47.053157,
        name: 'EcoFactor MOLDOVA 920022 (Vento SAC-10)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 185399,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 682054,
                power: 0
            }],
            id: 384937
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 682052,
                power: 0
            }],
            id: 384935
        }],
        url: 'http://api.plugshare.com/view/location/185399',
        longitude: 28.77683,
        icon_type: 'G'
    }, {
        address: 'Durlesti, Toma Alimos , 44/1',
        access: 1,
        latitude: 47.040113,
        name: 'EcoFactor Moldova (SOLAR)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 241468,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1361758,
                power: 0
            }],
            id: 524323
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1361757,
                power: 0
            }],
            id: 524322
        }],
        url: 'http://api.plugshare.com/view/location/241468',
        longitude: 28.749665,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'Strada Sf\u00e2ntul Vasile 1, Ia\u0219i, Romania',
        access: 1,
        latitude: 47.140746,
        name: 'SC PFL Antralux SRL',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 215229,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1004557,
                power: 0
            }],
            id: 463801
        }],
        url: 'http://api.plugshare.com/view/location/215229',
        longitude: 27.576407,
        icon_type: 'G'
    }, {
        score: 7.8,
        address: 'Strada 3 Brazi, Nr. 6, 505300, Predeal, Romania',
        access: 1,
        latitude: 45.511686,
        name: 'Polyfazer - Hotel Orizont Predeal',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 138831,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 523991,
                power: 0
            }],
            id: 259102
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 523990,
                power: 0
            }],
            id: 259101
        }],
        url: 'http://api.plugshare.com/view/location/138831',
        longitude: 25.570433,
        icon_type: 'G'
    }, {
        score: 9.6,
        address: 'Str Mihail Saulescu, Nr.121, Predeal, Predeal 505300',
        access: 1,
        latitude: 45.504364,
        name: 'Polyfazer - Hotel Carmen - Polyfazer',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 144100,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 542461,
                power: 0
            }],
            id: 274114
        }],
        url: 'http://api.plugshare.com/view/location/144100',
        longitude: 25.573628,
        icon_type: 'G'
    }, {
        address: 'Strada Horea 49, Oradea, Romania',
        access: 1,
        latitude: 47.045724,
        name: 'Challenge com',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218300,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1083757,
                power: 0
            }],
            id: 475116
        }],
        url: 'http://api.plugshare.com/view/location/218300',
        longitude: 21.93281,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Lidl, Strada Tudor Vladimirescu, Oradea, Rom\u00e1nia',
        access: 1,
        latitude: 47.062774,
        name: 'LIDL',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 223049,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1175069,
                power: 0
            }],
            id: 487278
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1175068,
                power: 0
            }],
            id: 487277
        }],
        url: 'http://api.plugshare.com/view/location/223049',
        longitude: 21.913466,
        icon_type: 'G'
    }, {
        address: 'bd. 21 Decembrie 1989 nr. 67, Cluj-Napoca 400124',
        access: 1,
        latitude: 46.775354,
        name: 'Hampton Inn by Hilton',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 116630,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 437219,
                power: 0
            }],
            id: 202265
        }],
        url: 'http://api.plugshare.com/view/location/116630',
        longitude: 23.601527,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Gheorghe Doja nr. 11, Timi\u0219oara 300195',
        access: 1,
        latitude: 45.746549,
        name: 'Lek3.co CasaDoja',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 146508,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1238947,
                power: 0
            }],
            id: 502283
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 551216,
                power: 0
            }],
            id: 281546
        }],
        url: 'http://api.plugshare.com/view/location/146508',
        longitude: 21.220788,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Calea Aurel Vlaicu 141, Arad, Romania',
        access: 1,
        latitude: 46.196384,
        name: 'Kaufland (Vlaicu)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 91300,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 714531,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 714530,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 607835,
                power: 0
            }],
            id: 306875
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 607831,
                power: 0
            }],
            id: 326934
        }],
        url: 'http://api.plugshare.com/view/location/91300',
        longitude: 21.298099,
        icon_type: 'Y'
    }, {
        score: 9.0,
        address: 'Strada 14 Decembrie 1989 2, Ia\u0219i 700124, Romania',
        access: 1,
        latitude: 47.165283,
        name: 'Hotel Select',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 243722,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1405766,
                power: 0
            }],
            id: 528441
        }, {
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1405768,
                power: 0
            }],
            id: 528443
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1405767,
                power: 0
            }],
            id: 528442
        }],
        url: 'http://api.plugshare.com/view/location/243722',
        longitude: 27.581435,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Toamnei nr. 1, Re\u0219i\u021ba 320070',
        access: 1,
        latitude: 45.2967,
        name: 'Lidl (Toamnei)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 164892,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 612502,
                power: 0
            }],
            id: 330929
        }],
        url: 'http://api.plugshare.com/view/location/164892',
        longitude: 21.883144,
        icon_type: 'G'
    }, {
        address: 'Odorheiu Secuiesc, str. Orb\u00e1n Bal\u00e1zs, nr. 106',
        access: 1,
        latitude: 46.314657,
        name: 'LEK3.CO Septimia Resort - Hotel, Wellness & SPA',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 244862,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1426764,
                power: 0
            }],
            id: 531068
        }],
        url: 'http://api.plugshare.com/view/location/244862',
        longitude: 25.287877,
        icon_type: 'G'
    }, {
        address: 'Strada Prim\u0103verii, Urla\u0163i, 106300, Romania',
        access: 1,
        latitude: 44.984911,
        name: 'Lidl Urlati',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 247822,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1469024,
                power: 0
            }],
            id: 541269
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1469023,
                power: 0
            }],
            id: 541268
        }],
        url: 'http://api.plugshare.com/view/location/247822',
        longitude: 26.232894,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'Calea lui Traian 168, R\u00e2mnicu V\u00e2lcea 247065, Rom\u00e2nia',
        access: 1,
        latitude: 45.118141,
        name: 'R\u00e2mnicu V\u00e2lcea',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 238230,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319626,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1319625,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1294663,
                power: 0
            }],
            id: 516302
        }],
        url: 'http://api.plugshare.com/view/location/238230',
        longitude: 24.363967,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: '5601 B\u00e9k\u00e9scsaba, Posta k\u00f6z',
        access: 1,
        latitude: 46.678808,
        name: 'B\u00e9k\u00e9scsaba, Posta k\u00f6z',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 157802,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 586004,
                power: 0
            }],
            id: 309308
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 586005,
                power: 0
            }],
            id: 309309
        }],
        url: 'http://api.plugshare.com/view/location/157802',
        longitude: 21.097185,
        icon_type: 'G'
    }, {
        score: 7.9,
        address: 'not registered',
        access: 1,
        latitude: 45.350714,
        name: 'Taverna Sarbului Sinaia',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 47228,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 14,
                id: 609726,
                power: 0
            }],
            id: 328520
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 600429,
                power: 0
            }],
            id: 208923
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 600431,
                power: 0
            }],
            id: 320921
        }],
        url: 'http://api.plugshare.com/view/location/47228',
        longitude: 25.534922,
        icon_type: 'G'
    }, {
        score: 8.4,
        address: 'str. Milcov nr. 2-4, Bac\u0103u 600149',
        access: 1,
        latitude: 46.563081,
        name: 'Cora Bac\u0103u',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 99939,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 510091,
                power: 0
            }],
            id: 182440
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 510092,
                power: 0
            }],
            id: 166175
        }],
        url: 'http://api.plugshare.com/view/location/99939',
        longitude: 26.922322,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'bd. Simion B\u0103rnu\u021biu nr. 28, Timi\u0219oara 300133',
        access: 1,
        latitude: 45.763128,
        name: 'Lidl (B\u0103rnu\u021biu)',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 137435,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 692482,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 692481,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 519332,
                power: 0
            }],
            id: 255171
        }],
        url: 'http://api.plugshare.com/view/location/137435',
        longitude: 21.252407,
        icon_type: 'Y'
    }, {
        score: 9.3,
        address: 'Strada Mihail Kog\u0103lniceanu 11-15, Timi\u0219oara 300126, Romania',
        access: 1,
        latitude: 45.764277,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 143609,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 540716,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 540717,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 540718,
                power: 0
            }],
            id: 272695
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 540715,
                power: 0
            }],
            id: 272694
        }],
        url: 'http://api.plugshare.com/view/location/143609',
        longitude: 21.245376,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'bd. Socola, Ia\u015fi',
        access: 1,
        latitude: 47.145887,
        name: 'Dedeman Ia\u0219i ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 143567,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1464998,
                power: 0
            }],
            id: 538509
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 540529,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 540530,
                power: 0
            }],
            id: 272537
        }],
        url: 'http://api.plugshare.com/view/location/143567',
        longitude: 27.595105,
        icon_type: 'G'
    }, {
        address: '\u0219os. P\u0103curari nr. 143, Ia\u0219i 700544',
        access: 1,
        latitude: 47.173712,
        name: 'Casa Auto Ia\u0219i',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 115552,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 432831,
                power: 0
            }],
            id: 199387
        }],
        url: 'http://api.plugshare.com/view/location/115552',
        longitude: 27.507018,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'str. Muntenia nr. 2, Mioveni 115400',
        access: 1,
        latitude: 44.960445,
        name: 'Parcare Stadion Mioveni',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 78500,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 876205,
                power: 0
            }],
            id: 448840
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 504866,
                power: 0
            }],
            id: 245698
        }],
        url: 'http://api.plugshare.com/view/location/78500',
        longitude: 24.942207,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'bd. Dacia nr. 1, Mioveni 115400',
        access: 1,
        latitude: 44.956098,
        name: 'Prim\u0103ria Mioveni',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 78499,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 863866,
                power: 0
            }],
            id: 447234
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 863865,
                power: 0
            }],
            id: 447233
        }],
        url: 'http://api.plugshare.com/view/location/78499',
        longitude: 24.936669,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Fabricii nr. 12, Cluj-Napoca 400620',
        access: 1,
        latitude: 46.781706,
        name: 'Kaufland',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 90541,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1103479,
                power: 0
            }],
            id: 477385
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1099048,
                power: 0
            }],
            id: 476885
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1088088,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1088087,
                power: 0
            }],
            id: 214195
        }],
        url: 'http://api.plugshare.com/view/location/90541',
        longitude: 23.613973,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'pia\u021ba 1 Mai nr. 4-5, Cluj-Napoca 400051 (\u00een incinta Clujana)',
        access: 1,
        latitude: 46.787281,
        name: 'General Security',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 177637,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 698098,
                power: 0
            }],
            id: 397163
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 698097,
                power: 0
            }],
            id: 397162
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 675221,
                power: 0
            }],
            id: 364877
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 655983,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 655982,
                power: 0
            }],
            id: 364876
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 655981,
                power: 0
            }],
            id: 364875
        }],
        url: 'http://api.plugshare.com/view/location/177637',
        longitude: 23.609696,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'calea Feldioarei nr. 68A, Bra\u0219ov 500483 (DN13)',
        access: 1,
        latitude: 45.694033,
        name: 'SOCAR (Feldioarei)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 158860,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 600387,
                power: 0
            }],
            id: 320883
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 590743,
                power: 0
            }],
            id: 313074
        }],
        url: 'http://api.plugshare.com/view/location/158860',
        longitude: 25.583583,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. \u0218tefana nr. 1, DJ592, Mo\u0219ni\u021ba Nou\u0103 307285',
        access: 1,
        latitude: 45.722693,
        name: 'Lidl (Mo\u0219ni\u021ba Nou\u0103)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 244507,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1422726,
                power: 0
            }],
            id: 530385
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1422725,
                power: 0
            }],
            id: 530288
        }],
        url: 'http://api.plugshare.com/view/location/244507',
        longitude: 21.299782,
        icon_type: 'G'
    }, {
        score: 8.0,
        address: 'str. Avram Iancu nr. 492-500, Flore\u0219ti 407280',
        access: 1,
        latitude: 46.75093,
        name: 'Lek3.co VIVO!',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 179522,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1031900,
                power: 0
            }],
            id: 466636
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 662551,
                power: 0
            }],
            id: 369930
        }],
        url: 'http://api.plugshare.com/view/location/179522',
        longitude: 23.532891,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Central Plaza, Strada Erou Ciprian Pintea nr. 29, Bac\u0103u 600112, Romania',
        access: 1,
        latitude: 46.555745,
        name: 'Central Plaza',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 193246,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1319524,
                power: 0
            }, {
                kilowatts: null,
                connector: 13,
                id: 1319523,
                power: 0
            }, {
                kilowatts: null,
                connector: 3,
                id: 1091436,
                power: 0
            }],
            id: 476075
        }],
        url: 'http://api.plugshare.com/view/location/193246',
        longitude: 26.917256,
        icon_type: 'Y'
    }, {
        score: 10.0,
        address: 'str. Milcov, nr. 5A',
        access: 1,
        latitude: 46.556172,
        name: 'Rompetrol 3 Bac\u0103u',
        icon: 'https://assets.plugshare.com/icons/Y.png',
        id: 143198,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 3,
                id: 1091434,
                power: 0
            }],
            id: 476073
        }, {
            outlets: [{
                kilowatts: null,
                connector: 13,
                id: 1091433,
                power: 0
            }],
            id: 476072
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 698349,
                power: 0
            }],
            id: 397327
        }],
        url: 'http://api.plugshare.com/view/location/143198',
        longitude: 26.924108,
        icon_type: 'Y'
    }, {
        address: '\u0432\u0443\u043b\u0438\u0446\u044f \u041a\u043b\u0443\u0448\u0438\u043d\u0430, \u0406\u0437\u043c\u0430\u0457\u043b, \u041e\u0434\u0435\u0441\u044c\u043a\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c, \u0423\u043a\u0440\u0430\u0438\u043d\u0430, 68601',
        access: 1,
        latitude: 45.351926,
        name: 'ElectroUA 1191',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 245591,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1441600,
                power: 0
            }],
            id: 534004
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1441599,
                power: 0
            }],
            id: 534003
        }, {
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1436420,
                power: 0
            }],
            id: 532915
        }],
        url: 'http://api.plugshare.com/view/location/245591',
        longitude: 28.823529,
        icon_type: 'G'
    }, {
        address: 'Lev Tolstoi 3/1',
        access: 1,
        latitude: 47.010714,
        name: 'EcoFactor MOLDOVA (Hotel Tomas Albert)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 246301,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1447828,
                power: 0
            }],
            id: 534637
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1447829,
                power: 0
            }],
            id: 534638
        }],
        url: 'http://api.plugshare.com/view/location/246301',
        longitude: 28.839148,
        icon_type: 'G'
    }, {
        score: 2.8,
        address: 'Strada Palas 7A, Ia\u0219i 700051, Romania',
        access: 1,
        latitude: 47.155347,
        name: 'Palas Mall EVConnect.ro',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 175092,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 662132,
                power: 0
            }],
            id: 369625
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 647579,
                power: 0
            }],
            id: 358293
        }],
        url: 'http://api.plugshare.com/view/location/175092',
        longitude: 27.58694,
        icon_type: 'G'
    }, {
        address: 'Strada Calea Ie\u015filor 83, Chi\u0219in\u0103u, Moldova',
        access: 1,
        latitude: 47.053387,
        name: 'Bemol Gas Station',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218033,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1077635,
                power: 0
            }],
            id: 474449
        }, {
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1077636,
                power: 0
            }],
            id: 474450
        }],
        url: 'http://api.plugshare.com/view/location/218033',
        longitude: 28.770881,
        icon_type: 'G'
    }, {
        address: '\u015fos. H\u00eence\u015fti 151, Chisinau, Moldova',
        access: 1,
        latitude: 46.991621,
        name: 'EVPOINT Moldova, Chisinau, EV0005 (Bemol Gas Station)',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 218036,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077650,
                power: 0
            }],
            id: 474456
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1077649,
                power: 0
            }],
            id: 474455
        }],
        url: 'http://api.plugshare.com/view/location/218036',
        longitude: 28.787257,
        icon_type: 'G'
    }, {
        address: '\u041a\u0438\u0448\u0438\u043d\u0451\u0432, \u041c\u043e\u043b\u0434\u043e\u0432\u0430',
        access: 1,
        latitude: 46.994049,
        name: 'CS AutoEnterprise 2403',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 237092,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 2,
                id: 1285875,
                power: 0
            }],
            id: 513604
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1285876,
                power: 0
            }],
            id: 513603
        }],
        url: 'http://api.plugshare.com/view/location/237092',
        longitude: 28.792599,
        icon_type: 'G'
    }, {
        address: 'Calea Aradului 87a, Oradea, Rom\u00e2nia',
        access: 1,
        latitude: 47.041295,
        name: 'Sta\u021bie Dedeman ',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 239016,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1301165,
                power: 0
            }],
            id: 518028
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1301164,
                power: 0
            }],
            id: 518027
        }],
        url: 'http://api.plugshare.com/view/location/239016',
        longitude: 21.899132,
        icon_type: 'G'
    }, {
        score: 9.0,
        address: 'bd. Eroilor nr. 17, Bra\u0219ov 500030',
        access: 1,
        latitude: 45.645192,
        name: 'Public Parking',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 65067,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 385755,
                power: 0
            }],
            id: 97908
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 385721,
                power: 0
            }],
            id: 90638
        }],
        url: 'http://api.plugshare.com/view/location/65067',
        longitude: 25.593916,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'Strada Pie\u021bii, Bra\u0219ov',
        access: 1,
        latitude: 45.644164,
        name: 'Parking Military Hospital Regina Maria',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 98130,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 377060,
                power: 0
            }],
            id: 161282
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 377062,
                power: 0
            }],
            id: 161281
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 377064,
                power: 0
            }],
            id: 161280
        }, {
            outlets: [{
                kilowatts: null,
                connector: 10,
                id: 377066,
                power: 0
            }],
            id: 161279
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 377067,
                power: 0
            }],
            id: 161278
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 377073,
                power: 0
            }],
            id: 161275
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 377069,
                power: 0
            }],
            id: 161277
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 377071,
                power: 0
            }],
            id: 161276
        }],
        url: 'http://api.plugshare.com/view/location/98130',
        longitude: 25.599603,
        icon_type: 'G'
    }, {
        address: 'DN28 km. 10, Valea Lupului 707410',
        access: 1,
        latitude: 47.172615,
        name: 'Casa Auto Valea Lupului',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 197980,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 729063,
                power: 0
            }],
            id: 419164
        }],
        url: 'http://api.plugshare.com/view/location/197980',
        longitude: 27.517863,
        icon_type: 'G'
    }, {
        address: 'Soseaua Pacurari, numarul 189, Iasi, Romania ',
        access: 1,
        latitude: 47.175632,
        name: 'BMW APAN Motors Iasi',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 80630,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1093247,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 361464,
                power: 0
            }],
            id: 117629
        }],
        url: 'http://api.plugshare.com/view/location/80630',
        longitude: 27.494659,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Poiana Soarelui nr. 243, Poiana Bra\u0219ov 500001',
        access: 1,
        latitude: 45.589303,
        name: 'Hotel Teleferic',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 166686,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1282549,
                power: 0
            }],
            id: 512684
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 1282548,
                power: 0
            }],
            id: 512683
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 618291,
                power: 0
            }, {
                kilowatts: null,
                connector: 7,
                id: 618290,
                power: 0
            }],
            id: 335494
        }],
        url: 'http://api.plugshare.com/view/location/166686',
        longitude: 25.552279,
        icon_type: 'G'
    }, {
        score: 10.0,
        address: 'str. Valea Drag\u0103, Poiana Bra\u0219ov 500001',
        access: 1,
        latitude: 45.592023,
        name: 'Ana Hotels \u00b7 Sport Poiana Bra\u0219ov',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 99210,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 382169,
                power: 0
            }],
            id: 164383
        }],
        url: 'http://api.plugshare.com/view/location/99210',
        longitude: 25.556723,
        icon_type: 'G'
    }, {
        score: 5.9,
        address: 'calea Circumvala\u021biunii nr. 6, Timi\u0219oara 300013',
        access: 1,
        latitude: 45.753039,
        name: 'Incuboxx',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 210175,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 889197,
                power: 0
            }],
            id: 450386
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 889196,
                power: 0
            }],
            id: 450385
        }],
        url: 'http://api.plugshare.com/view/location/210175',
        longitude: 21.216467,
        icon_type: 'G'
    }, {
        score: 5.2,
        address: 'splaiul Nicolae Titulescu nr. 8, Timi\u0219oara 300158',
        access: 1,
        latitude: 45.749561,
        name: 'Nokia Statie Privata (Coming Soon)',
        icon: 'https://assets.plugshare.com/icons/GR.png',
        id: 152949,
        stations: [{
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 564058,
                power: 0
            }],
            id: 292908
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 564057,
                power: 0
            }],
            id: 292907
        }, {
            outlets: [{
                kilowatts: null,
                connector: 7,
                id: 564056,
                power: 0
            }],
            id: 292906
        }],
        url: 'http://api.plugshare.com/view/location/152949',
        longitude: 21.212782,
        icon_type: 'GR'
    }, {
        score: 6.2,
        address: 'Calea Aradului 62, Oradea, Rom\u00e2nia',
        access: 1,
        latitude: 47.042612,
        name: 'Carrefour',
        icon: 'https://assets.plugshare.com/icons/G.png',
        id: 236389,
        stations: [{
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1278892,
                power: 0
            }, {
                kilowatts: 22.0,
                connector: 7,
                id: 1278893,
                power: 0
            }],
            id: 511595
        }, {
            outlets: [{
                kilowatts: 22.0,
                connector: 7,
                id: 1278890,
                power: 0
            }, {
                kilowatts: 22.0,
                connector: 7,
                id: 1278891,
                power: 0
            }],
            id: 511594
        }],
        url: 'http://api.plugshare.com/view/location/236389',
        longitude: 21.904819,
        icon_type: 'G'
    }];

    public styles = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f5f5f5'
                }
            ]
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161'
                }
            ]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#f5f5f5'
                }
            ]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#bdbdbd'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575'
                }
            ]
        },
        {
            featureType: 'poi.business',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#c1e4b4'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dadada'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161'
                }
            ]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        },
        {
            featureType: 'transit',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5'
                }
            ]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#c9c9c9'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#afcbe4'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e'
                }
            ]
        }
    ];
    private subscription = new Subscription();
    public stations: Station[] = [];

    public ngOnInit() {
        this.loadMarkers();
    }
    // public meme() {
    //     console.log(this.stations);
    //     this.stationService.postStations(this.stations).subscribe(
    //         r => console.log(r)
    //     );
    // }
    // public steril() {
    //     this.data.forEach(
    //         (station) => {
    //             console.log(station);
    //             const temp: Station = {
    //                 id: '',
    //                 name: '',
    //                 coordinates: {
    //                     latitude: '',
    //                     longitude: '',
    //                 },
    //                 description: '',
    //                 status: 0,
    //                 chargeType: 0,
    //                 power: 0
    //             };
    //             temp.name = station.name;
    //             temp.description = station.address;
    //             temp.coordinates.latitude = station.latitude.toString();
    //             temp.coordinates.longitude = station.longitude.toString();
    //             this.stations.push(temp);
    //         }
    //     );
    // }

    public async markerClicked(event: AgmMarker, m: any) {
        const dialogRef = this.dialog.open(PopoverComponent, {
            data: m
        });

        dialogRef.afterClosed().subscribe(
            result => {
                if (result.directions) {
                    this.getDirections(result.data);
                } else {
                    this.subscription.add(
                        this.stationService.updateStation(result.data.stationId, result.data).subscribe()
                    );
                }
            });
    }

    public getDirections(data: any) {
        const directions: Directions = {
            origin: '44.3854,26.1075978',
            destination: data.coordinates.latitude + ',' + data.coordinates.longitude
        };

        this.subscription.add(
            this.stationService.directions2(directions).subscribe(
                (res) => {
                    this.routeOverview = res.routes[0];
                    this.bounds = {
                        south: this.routeOverview.bounds.southWest.latitude,
                        north: this.routeOverview.bounds.northEast.latitude,
                        east: this.routeOverview.bounds.northEast.longitude,
                        west: this.routeOverview.bounds.southWest.longitude,
                    };
                    this.navigate = true;
                    this.route = res.routes[0].overviewPath.line;
                    console.log(this.route);
                    this.snackBar.open(
                        'Durata si distanta traseului ' + this.routeOverview.legs[0].duration.text + ' ' + this.routeOverview.legs[0].distance.text, '', {
                        verticalPosition: 'top',
                        duration: 5000,
                    });
                }
            ));
    }

    public cancelNav() {
        this.navigate = false;
        this.route = [{
            latitude: 0,
            longitude: 0
        }];
    }

    public loadMarkers() {
        this.stationService.getStations().subscribe(
            (stations) => {
                this.markers = stations;
            }
        );
    }

    public getCoordinates() {
        this.stationService.directions().subscribe(
            (r) => console.log(r),
            (er) => console.log(er)
        );
    }
    getDirection() {
        this.origin = { lat: 43.3854, lng: 28.1075978 };
        this.destination = { lat: 45.382632, lng: 26.108657 };

        // this.origin = 'Taipei Main Station'
        // this.destination = 'Taiwan Presidential Office'
    }

    public iconUrl(n: number): string {
        return n === 0 ? './assets/0.png' : './assets/1.png';
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
