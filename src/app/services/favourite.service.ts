import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IProduct } from '../children/catalog/interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FavouriteService {
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

    private readonly _favouriteProductsKey: string = 'favourite';
    private _favouriteProducts: IProduct[] = [];

    constructor(private readonly _storageService: StorageService) {
        this._favouriteProducts = JSON.parse(
            this._storageService.getFromStorage(this._favouriteProductsKey) ??
                '[]'
        );

        this._productsAmount$.next(this._favouriteProducts.length);
        this._products$.next(this._favouriteProducts);
    }

    public toggleFavourite(product: IProduct): void {
        if (!product.isFavourite) {
            this.add(product);
            product.isFavourite = true;
        } else {
            this.remove(product.id);
            product.isFavourite = false;
        }
    }

    public add(product: IProduct): void {
        this._favouriteProducts.push(product);
        this._storageService.addToStorage(
            this._favouriteProductsKey,
            JSON.stringify(this._favouriteProducts)
        );

        this._productsAmount$.next(this._favouriteProducts.length);
        this._products$.next(this._favouriteProducts);
    }

    public get(): IProduct[] {
        return this._favouriteProducts;
    }

    public remove(id: number): void {
        this._favouriteProducts = this._favouriteProducts.filter(
            (product: IProduct) => product.id !== id
        );

        if (this._favouriteProducts.length === 0) {
            this._storageService.removeFromStorage(this._favouriteProductsKey);
        } else {
            this._storageService.addToStorage(
                this._favouriteProductsKey,
                JSON.stringify(this._favouriteProducts)
            );
        }

        this._productsAmount$.next(this._favouriteProducts.length);
        this._products$.next(this._favouriteProducts);
    }
}
