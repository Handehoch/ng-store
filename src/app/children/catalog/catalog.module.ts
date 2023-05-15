import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPage } from './pages/catalog/catalog.page';
import {
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { ProductsRequestService } from './services/products-request/products-request.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
    TuiButtonModule,
    TuiHintModule,
    TuiLoaderModule,
    tuiLoaderOptionsProvider,
    TuiSvgModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductPage } from './pages/product/product.page';
import { StringCutterPipe } from './pipes/string-cutter/string-cutter.pipe';

const components: any[] = [
    ProductsListComponent,
    ProductCardComponent,
    CategoriesListComponent,
    ProductsFilterComponent,
    CatalogPage,
    ProductPage,
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        TuiInputModule,
        HttpClientModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiSvgModule,
        TuiButtonModule,
        TuiCheckboxLabeledModule,
        TuiMultiSelectModule,
        TuiDataListWrapperModule,
        StringCutterPipe,
        TuiLoaderModule,
        TuiHintModule,
    ],
    exports: [
        ProductsListComponent,
        CategoriesListComponent,
        ProductCardComponent,
    ],
    providers: [
        ProductsRequestService,
        {
            provide: 'API_URL',
            useValue: 'https://fakestoreapi.com',
        },
        tuiLoaderOptionsProvider({
            size: 'l',
            inheritColor: false,
            overlay: true,
        }),
    ],
})
export class CatalogModule {}
