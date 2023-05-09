import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
} from '@angular/core';
import { ProductsFilterViewModel } from '../../view-models/products-filter.view-model';
import { forkJoin, Observable, take, takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../../../services/destroy.service';
import { ProductsRequestService } from '../../services/products-request/products-request.service';

@Component({
    selector: 'app-products-filter',
    templateUrl: './products-filter.component.html',
    styleUrls: ['./styles/products-filter.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class ProductsFilterComponent {
    @Input()
    public model!: ProductsFilterViewModel;

    @Input()
    public categories!: string[];

    constructor(private readonly _destroy$: DestroyService) {}
}
