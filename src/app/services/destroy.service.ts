import { Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

/**
 * @see https://github.com/TinkoffCreditSystems/taiga-ui
 * Observable abstraction over ngOnDestroy to use with takeUntil
 */
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy() {
        this.next();
        this.complete();
    }
}
