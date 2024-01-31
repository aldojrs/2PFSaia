import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    toggleMenu() {
        this.sidenav.toggle();
    }
}

