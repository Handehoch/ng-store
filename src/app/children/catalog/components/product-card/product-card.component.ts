import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { CartService } from '../../../../services/cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./styles/product-card.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    @Input()
    public product!: IProduct;

    constructor(private readonly _cartService: CartService) {}

    public addToCart(product: IProduct): void {
        this._cartService.addToCart(product);
    }
}
