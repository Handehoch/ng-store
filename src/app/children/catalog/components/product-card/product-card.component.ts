import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
} from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { CartService } from '../../../../services/cart.service';
import { Router } from '@angular/router';
import { FavouriteService } from '../../../../services/favourite.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./styles/product-card.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnChanges {
    @Input()
    public product!: IProduct;

    constructor(
        private readonly _favouriteService: FavouriteService,
        private readonly _cartService: CartService,
        private readonly _router: Router
    ) {}

    public ngOnChanges(): void {
        const products: IProduct[] = this._favouriteService.get();

        if (
            products.some((product: IProduct) => product.id === this.product.id)
        ) {
            this.product.isFavourite = true;
        }
    }

    public toggleFavourite(): void {
        if (!this.product.isFavourite) {
            this._favouriteService.add(this.product);
            this.product.isFavourite = true;
        } else {
            this._favouriteService.remove(this.product.id);
            this.product.isFavourite = false;
        }
    }

    public navigateToProduct(): void {
        this._router.navigate([`catalog`, this.product.id]);
    }

    public addToCart(product: IProduct): void {
        this._cartService.add(product);
    }
}
