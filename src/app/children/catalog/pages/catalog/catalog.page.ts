import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsRequestService } from '../../services/products-request/products-request.service';
import { forkJoin, map, Observable, take } from 'rxjs';
import { IProduct } from '../../interfaces/product.interface';
import { Location } from '@angular/common';
import { ProductsFilterViewModel } from '../../view-models/products-filter.view-model';

interface ICatalogData {
    products: IProduct[];
    categories: string[];
}

@Component({
    templateUrl: './catalog.page.html',
    styleUrls: ['./styles/catalog.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPage implements OnInit {
    protected catalogData$!: Observable<ICatalogData>;
    protected productsFilterVM: ProductsFilterViewModel;

    constructor(
        private readonly _location: Location,
        private readonly _productsRequestService: ProductsRequestService
    ) {
        this.productsFilterVM = new ProductsFilterViewModel();
    }

    public ngOnInit(): void {
        this.catalogData$ = forkJoin(
            this._productsRequestService.getProducts().pipe(take(1)),
            this._productsRequestService.getProductCategories().pipe(take(1))
        ).pipe(
            map(([products, categories]: [IProduct[], string[]]) => {
                return { products, categories };
            })
        );
    }
}
