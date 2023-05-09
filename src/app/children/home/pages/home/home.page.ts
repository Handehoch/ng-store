import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { IProduct } from '../../../catalog/interfaces/product.interface';
import { debounceTime, Observable, take, takeUntil, tap } from 'rxjs';
import { ProductsRequestService } from '../../../catalog/services/products-request/products-request.service';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '../../../../services/destroy.service';

@Component({
    templateUrl: './home.page.html',
    styleUrls: ['./styles/home.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class HomePage implements OnInit, AfterViewInit {
    protected products$!: Observable<IProduct[]>;
    protected categories$!: Observable<string[]>;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _destroy$: DestroyService,
        private readonly _productsRequestService: ProductsRequestService
    ) {}

    public ngOnInit(): void {
        this.getProducts();
        this.getCategories();
    }

    public ngAfterViewInit(): void {
        this._route.fragment
            .pipe(
                takeUntil(this._destroy$),
                tap((fragment: string | null) => {
                    if (fragment) {
                        document.getElementById(fragment)?.scrollIntoView();
                    }
                })
            )
            .subscribe();
    }

    private getProducts(): void {
        this.products$ = this._productsRequestService
            .getProducts({ limit: 4 })
            .pipe(take(1));
    }

    private getCategories(): void {
        this.categories$ = this._productsRequestService
            .getProductCategories()
            .pipe(take(1));
    }
}
