import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IProduct } from '../children/catalog/interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartService {
    public get products$(): Observable<IProduct[]> {
        return this._products$.asObservable();
    }

    public get productsAmount$(): Observable<number> {
        return this._productsAmount$.asObservable();
    }

    private readonly _products$: BehaviorSubject<IProduct[]> =
        new BehaviorSubject<IProduct[]>([]);

    private readonly _productsAmount$: BehaviorSubject<number> =
        new BehaviorSubject<number>(0);

    private readonly _cartProductsKey: string = 'cart';
    private _cartProducts: IProduct[] = [];

    constructor(private readonly _storageService: StorageService) {
        this._cartProducts = JSON.parse(
            this._storageService.getFromStorage(this._cartProductsKey) ?? '[]'
        );

        this._productsAmount$.next(this._cartProducts.length);
        this._products$.next(this._cartProducts);
    }

    public add(product: IProduct): void {
        this._cartProducts.push(product);
        this._storageService.addToStorage(
            this._cartProductsKey,
            JSON.stringify(this._cartProducts)
        );

        this._productsAmount$.next(this._cartProducts.length);
        this._products$.next(this._cartProducts);
    }

    public remove(index: number): void {
        this._cartProducts.splice(index, 1);

        if (this._cartProducts.length === 0) {
            this._storageService.removeFromStorage(this._cartProductsKey);
        } else {
            this._storageService.addToStorage(
                this._cartProductsKey,
                JSON.stringify(this._cartProducts)
            );
        }

        this._productsAmount$.next(this._cartProducts.length);
        this._products$.next(this._cartProducts);
    }
}
