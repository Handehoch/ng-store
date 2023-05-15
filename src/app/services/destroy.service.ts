import { Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy() {
        this.next();
        this.complete();
    }
}
