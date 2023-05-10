import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { HomePage } from './pages/home/home.page';
import { ProductsRequestService } from '../catalog/services/products-request/products-request.service';
import { CatalogModule } from '../catalog/catalog.module';

const components: any = [HomePage, HeroComponent];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: HomePage,
    },
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CatalogModule,
        TuiButtonModule,
    ],
    exports: [HeroComponent, RouterModule],
    providers: [ProductsRequestService],
})
export class HomeRoutingModule {}
