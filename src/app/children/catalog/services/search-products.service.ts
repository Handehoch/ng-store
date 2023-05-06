import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchProductsService {
    public readonly currentQuery$: Subject<string> = new Subject<string>();
}
