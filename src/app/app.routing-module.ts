import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiRootModule,
    TuiSvgModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StorageService } from './services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { CartService } from './services/cart.service';
import { HomeRoutingModule } from './children/home/home.routing-module';
import { CatalogRoutingModule } from './children/catalog/catalog.routing-module';
import { FooterComponent } from './components/footer/footer.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';

const components: any = [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartModalComponent,
];

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./children/home/home.routing-module').then(
                (m: any) => m.HomeRoutingModule
            ),
    },
    {
        path: 'catalog',
        loadChildren: () =>
            import('./children/catalog/catalog.routing-module').then(
                (m: any) => m.CatalogRoutingModule
            ),
    },
];

@NgModule({
    declarations: components,
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiButtonModule,
        TuiSvgModule,
        HomeRoutingModule,
        CatalogRoutingModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
        StorageService,
        CartService,
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    ],
    bootstrap: [AppComponent],
})
export class AppRoutingModule {}
