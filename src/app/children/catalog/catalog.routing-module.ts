import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog.page';
import { CatalogModule } from './catalog.module';
import { ProductPage } from './pages/product/product.page';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogPage,
    },
    {
        path: 'catalog/:id',
        component: ProductPage,
    },
];

@NgModule({
    imports: [CommonModule, CatalogModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CatalogRoutingModule {}
