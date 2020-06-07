import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    public userId: string = JSON.parse(localStorage.getItem('userid'));
    constructor(
        private readonly user: UserService
    ) { }

    ngOnInit() { }

}
