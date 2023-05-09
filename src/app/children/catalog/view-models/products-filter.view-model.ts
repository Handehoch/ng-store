import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IProductsFilter } from '../interfaces/products-filter.interface';

export class ProductsFilterViewModel {
    public get searchText(): AbstractControl<string> | null {
        return this.formGroup.get('searchText');
    }

    public get priceCheckbox(): AbstractControl<boolean> | null {
        return this.formGroup.get('priceCheckbox');
    }

    public get nameCheckbox(): AbstractControl<boolean> | null {
        return this.formGroup.get('nameCheckbox');
    }

    public get favouriteCheckbox(): AbstractControl<boolean> | null {
        return this.formGroup.get('favouriteCheckbox');
    }

    public get categorySelect(): AbstractControl<string[]> | null {
        return this.formGroup.get('categorySelect');
    }

    public formGroup: FormGroup;

    constructor() {
        this.formGroup = new FormGroup({
            searchText: new FormControl<string>(''),
            priceCheckbox: new FormControl<boolean>(false),
            nameCheckbox: new FormControl<boolean>(false),
            favouriteCheckbox: new FormControl<boolean>(false),
            categorySelect: new FormControl<string[]>([]),
        });
    }

    public toModel(): IProductsFilter {
        return {
            byPrice: this.priceCheckbox?.value,
            byName: this.nameCheckbox?.value,
            byFavourite: this.favouriteCheckbox?.value,
            name: this.searchText?.value,
            categories: this.categorySelect?.value,
        };
    }
}
