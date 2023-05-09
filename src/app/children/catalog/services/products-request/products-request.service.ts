import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product.interface';
import { ProductsRequestQueryType } from './types/products-request-query.type';

@Injectable()
export class ProductsRequestService {
    constructor(
        @Inject('API_URL') private readonly _apiUrl: string,
        private readonly _http: HttpClient
    ) {}

    public getProducts(
        query?: ProductsRequestQueryType
    ): Observable<IProduct[]> {
        const params: ProductsRequestQueryType = {};

        if (query?.limit) {
            params['limit'] = query.limit;
        }

        return this._http.get<IProduct[]>(`${this._apiUrl}/products`, {
            responseType: 'json',
            params: params,
        });
    }

    public getProductById(id: number): Observable<IProduct> {
        return this._http.get<IProduct>(`${this._apiUrl}/products/${id}`, {
            responseType: 'json',
        });
    }

    public getProductCategories(): Observable<string[]> {
        return this._http.get<string[]>(`${this._apiUrl}/products/categories`, {
            responseType: 'json',
        });
    }

    public getProductsByCategory(categoryName: string): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(
            `${this._apiUrl}/products/category/${categoryName}`,
            {
                responseType: 'json',
            }
        );
    }
}
