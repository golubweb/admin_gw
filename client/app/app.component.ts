import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { AuthenticationService } from './shared/shared';

@Component({
    selector: 'root-app',
    templateUrl: '/templates/app.component.html',
    styles: [`
        .navbar-nav .active {
            font-weight: bold;
            border-bottom: 2px solid #d9534f
        }
    `]
})
export default class AppComponent {
    userIsLoggedIn: boolean;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.authService.userIsloggedIn.subscribe(isLoggedIn => {
            this.userIsLoggedIn = isLoggedIn;
        });
    }

    logout($event): void {
        $event.preventDefault();

        this.authService.logout().then(success => {
            if(success) {
                this.router.navigate(['/']);
            }
        });
    }
}
