import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    Input,
} from '@angular/core';
import { ITab } from '../../interfaces/tab.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./styles/header.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input()
    public tabs!: ITab[];

    protected readonly formGroup: FormGroup;

    constructor(
        private readonly _router: Router,
        protected readonly cartService: CartService,
        @Inject(Injector) private readonly _injector: Injector,
        @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService
    ) {
        this.formGroup = new FormGroup({
            searchInput: new FormControl(''),
        });
    }

    public navigateToTab(tab: ITab): void {
        if (!tab.fragment) {
            this._router.navigate([`${tab.routerLink}`]);

            return;
        }

        this._router.navigate([`${tab.routerLink}`], {
            fragment: tab.fragment,
        });
    }

    public showCartModal(): void {
        this._dialogs
            .open(
                new PolymorpheusComponent(CartModalComponent, this._injector),
                {
                    size: 'm',
                    label: 'Корзина покупок',
                    closeable: true,
                }
            )
            .subscribe();
    }

    protected isTabActive(tab: ITab): boolean {
        const path: string = document.location.href.split('/').pop() ?? '';
        return path.split('#').pop()?.includes(tab.name) ?? false;
    }
}
