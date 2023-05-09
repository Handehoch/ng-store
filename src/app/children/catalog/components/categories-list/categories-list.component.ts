import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./styles/categories-list.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {
    @Input()
    public title!: string;

    @Input()
    public categories!: string[];

    @Input()
    public appearance!: 'small' | 'large';

    constructor(private readonly _router: Router) {}

    public navigateToCatalog(categoryName: string): void {
        this._router.navigate(['catalog'], {
            state: { category: categoryName },
        });
    }
}
