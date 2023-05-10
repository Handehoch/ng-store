import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog/catalog.page';
import { CatalogModule } from './catalog.module';

const routes: Routes = [
    {
        path: '',
        component: CatalogPage,
    },
];

@NgModule({
    imports: [CommonModule, CatalogModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CatalogRoutingModule {}
