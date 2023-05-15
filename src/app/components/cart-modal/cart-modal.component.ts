import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { IProduct } from '../../children/catalog/interfaces/product.interface';

@Component({
    templateUrl: './cart-modal.component.html',
    styleUrls: ['./styles/cart-modal.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModalComponent {
    public totalCartSum$: Observable<number>;

    constructor(protected readonly cartService: CartService) {
        this.totalCartSum$ = this.cartService.products$.pipe(
            map((products: IProduct[]) => {
                return products.reduce((acc: number, product: IProduct) => {
                    return acc + product.price;
                }, 0);
            })
        );
    }

    public removeFromCart(index: number): void {
        this.cartService.remove(index);
    }
}
