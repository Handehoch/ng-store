import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog.page';
import { TuiInputModule } from '@taiga-ui/kit';
import { ProductsRequestService } from './services/products-request/products-request.service';
import { SearchProductsService } from './services/search-products.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';

const components: any[] = [HeaderComponent, CatalogPage];

const routes: Routes = [
    {
        path: '',
        component: CatalogPage,
        // children: [
        //     {
        //         path: ':name',
        //         component: Categories,
        //     },
        // ],
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
    ],
    exports: [HeaderComponent],
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
