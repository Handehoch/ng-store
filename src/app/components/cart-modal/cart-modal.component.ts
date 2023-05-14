import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    templateUrl: './cart-modal.component.html',
    styleUrls: ['./styles/cart-modal.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModalComponent {
    constructor(protected readonly cartService: CartService) {}

    public removeFromCart(id: number): void {
        this.cartService.removeFromCart(id);
    }
}
