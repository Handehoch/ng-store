import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnChanges,
    OnInit,
    ViewChild,
} from '@angular/core';
import { DestroyService } from '../../../../services/destroy.service';
import { ProductsRequestService } from '../../services/products-request/products-request.service';
import { IProduct } from '../../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { StringCutterPipe } from '../../pipes/string-cutter/string-cutter.pipe';
import { TuiDialogService } from '@taiga-ui/core';
import { CartService } from '../../../../services/cart.service';
import { FavouriteService } from '../../../../services/favourite.service';

@Component({
    templateUrl: './product.page.html',
    styleUrls: ['./styles/product.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, StringCutterPipe],
})
export class ProductPage implements OnInit, OnChanges {
    @ViewChild('description')
    public readonly description!: ElementRef<HTMLParagraphElement>;

    @ViewChild('modalDialog')
    public readonly modalDialog!: ElementRef;

    protected resizeButtonTitle$: BehaviorSubject<string> =
        new BehaviorSubject<string>('Показать целиком');

    protected product$: Observable<IProduct> = new Observable<IProduct>();

    constructor(
        private readonly _destroy$: DestroyService,
        private readonly _route: ActivatedRoute,
        private readonly _cutter: StringCutterPipe,
        private readonly _productsRequestService: ProductsRequestService,
        private readonly _cartService: CartService,
        private readonly _favouriteService: FavouriteService,
        @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService
    ) {}

    public ngOnInit(): void {
        this.product$ = this._productsRequestService.getProductById(
            parseInt(this._route.snapshot.url[1].path)
        );
    }

    public ngOnChanges(): void {
        const products: IProduct[] = this._favouriteService.get();

        this.product$
            .pipe(
                take(1),
                tap((product: IProduct) => {
                    if (
                        products.some(
                            (product: IProduct) => product.id === product.id
                        )
                    ) {
                        product.isFavourite = true;
                    }
                })
            )
            .subscribe();
    }

    public toggleFavourite(): void {
        debugger;
        this.product$
            .pipe(
                take(1),
                tap((product: IProduct) => {
                    this._favouriteService.toggleFavourite(product);
                    this.product$ = new BehaviorSubject<IProduct>(
                        product
                    ).asObservable();
                })
            )
            .subscribe();
    }

    public toggleDescription(product: IProduct): void {
        if (this.description.nativeElement.textContent!.length > 105) {
            this.description.nativeElement.textContent =
                this._cutter.transform(product.description, 100) + '...';

            this.resizeButtonTitle$.next('Показать целиком');

            return;
        }

        this.resizeButtonTitle$.next('Спрятать');
        this.description.nativeElement.textContent = product.description;
    }

    public showModal(): void {
        this._dialogs
            .open(this.modalDialog, {
                label: 'Ошибка',
                size: 'm',
                closeable: true,
            })
            .pipe(take(1))
            .subscribe();
    }

    public addToCart(product: IProduct): void {
        this._cartService.add(product);
    }
}
