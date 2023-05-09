import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IProduct } from '../children/catalog/interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartService {
    public get productsAmount$(): Observable<number> {
        return this._productsAmount$.asObservable();
    }

    private readonly _productsAmount$: BehaviorSubject<number> =
        new BehaviorSubject<number>(0);

    private readonly _cartProductsKey: string = 'cart';
    private _cartProducts: IProduct[] = [];

    constructor(private readonly _storageService: StorageService) {}

    public addToCart(product: IProduct): void {
        this._cartProducts.push(product);
        this._storageService.addToStorage(
            this._cartProductsKey,
            JSON.stringify(this._cartProducts)
        );

        this._productsAmount$.next(this._cartProducts.length);
    }

    public removeFromCart(id: number): void {
        this._cartProducts = this._cartProducts.filter(
            (cartProduct: IProduct) => id !== cartProduct.id
        );

        if (this._cartProducts.length === 0) {
            this._storageService.removeFromStorage(this._cartProductsKey);
            return;
        }

        this._storageService.addToStorage(
            this._cartProductsKey,
            JSON.stringify(this._cartProducts)
        );

        this._productsAmount$.next(this._cartProducts.length);
    }
}
