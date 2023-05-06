import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITab } from '../../../../interfaces/tab.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./styles/header.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input()
    public tabs!: ITab[];

    protected readonly formGroup: FormGroup;

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute
    ) {
        this.formGroup = new FormGroup({
            searchInput: new FormControl(''),
        });
    }

    public navigateToTab(tab: ITab): void {
        this._router.navigate([`${tab.routerLink}`], {
            relativeTo: this._route,
        });
    }

    public handleSearch(): void {
        console.log(this.formGroup.get('searchInput')?.value);
    }
}
