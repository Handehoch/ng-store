import { Component } from '@angular/core';
import { ITab } from '../../interfaces/tab.interface';

/**
 *  @todo
 *
 */

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./styles/app.master.scss'],
})
export class AppComponent {
    protected readonly tabs: ITab[] = [
        {
            name: 'home',
            routerLink: 'home',
        },
        {
            name: 'catalog',
            routerLink: 'catalog',
        },
        {
            name: 'categories',
            routerLink: 'home',
            fragment: 'categories',
        },
    ];

    protected readonly paymentIcons: string[] = [
        'Mir',
        'Mastercard',
        'GooglePay',
        'VisaMono',
    ];
}
