import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsRequestService } from '../../services/products-request/products-request.service';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product.interface';

@Component({
    templateUrl: './catalog.page.html',
    styleUrls: ['./styles/catalog.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPage implements OnInit {
    protected products$!: Observable<IProduct[]>;

    constructor(
        private readonly _goodsRequestService: ProductsRequestService
    ) {}

    public ngOnInit(): void {
        this.getProducts();
    }

    private getProducts(): void {
        this.products$ = this._goodsRequestService.getProducts();
    }
}
