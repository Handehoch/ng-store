import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogRoutingModule } from '../catalog/catalog.routing-module';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { HomePage } from './pages/home/home.page';
import { ProductsRequestService } from '../catalog/services/products-request/products-request.service';

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
        CatalogRoutingModule,
        TuiButtonModule,
    ],
    exports: [HeroComponent, RouterModule],
    providers: [ProductsRequestService],
})
export class HomeRoutingModule {}
