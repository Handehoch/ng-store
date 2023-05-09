import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog.page';
import {
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { ProductsRequestService } from './services/products-request/products-request.service';
import { SearchProductsService } from './services/search-products.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
    TuiButtonModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';

const components: any[] = [
    ProductsListComponent,
    ProductCardComponent,
    CategoriesListComponent,
    ProductsFilterComponent,
    CatalogPage,
];

const routes: Routes = [
    {
        path: '',
        component: CatalogPage,
    },
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TuiInputModule,
        HttpClientModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiSvgModule,
        TuiButtonModule,
        TuiCheckboxLabeledModule,
        TuiMultiSelectModule,
        TuiDataListWrapperModule,
    ],
    exports: [
        ProductsListComponent,
        CategoriesListComponent,
        ProductCardComponent,
        RouterModule,
    ],
    providers: [
        ProductsRequestService,
        SearchProductsService,
        {
            provide: 'API_URL',
            useValue: 'https://fakestoreapi.com',
        },
    ],
})
export class CatalogRoutingModule {}
