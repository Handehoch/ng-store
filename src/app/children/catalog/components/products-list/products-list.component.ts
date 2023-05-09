import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
} from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { ProductsFilterViewModel } from '../../view-models/products-filter.view-model';
import { debounceTime, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../services/destroy.service';
import { IProductsFilter } from '../../interfaces/products-filter.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./styles/products-list.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class ProductsListComponent implements OnChanges {
    @Input()
    public title!: string;

    @Input()
    public products!: IProduct[];

    @Input()
    public model!: ProductsFilterViewModel;

    constructor(
        private readonly _destroy$: DestroyService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngOnChanges(): void {
        if (!this.model) {
            return;
        }

        this.model.formGroup.valueChanges
            .pipe(
                takeUntil(this._destroy$),
                debounceTime(200),
                tap(() => {
                    this.filterProducts();
                    this._cdr.detectChanges();
                })
            )
            .subscribe();
    }

    public filterProducts(): IProduct[] {
        if (!this.model) {
            return this.products;
        }

        const filter: IProductsFilter = this.model.toModel();
        let filteredProducts: IProduct[] = Array.from(this.products);

        if (filter.byName) {
            filteredProducts = filteredProducts.sort(
                (a: IProduct, b: IProduct) => {
                    return a.title.localeCompare(b.title);
                }
            );
        }

        if (filter.byPrice) {
            filteredProducts = filteredProducts.sort(
                (a: IProduct, b: IProduct) => {
                    return b.price - a.price;
                }
            );
        }

        if (filter.name) {
            filteredProducts = filteredProducts.filter((product: IProduct) => {
                return product.title
                    .toLowerCase()
                    .match(filter.name?.toLowerCase() ?? '');
            });
        }

        if (filter.categories?.length !== 0) {
            filteredProducts = filteredProducts.filter((product: IProduct) => {
                return filter.categories?.includes(product.category);
            });
        }

        return filteredProducts;
    }
}
