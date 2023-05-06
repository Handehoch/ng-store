import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CatalogRoutingModule } from './children/catalog/catalog.routing-module';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'catalog',
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
    declarations: [AppComponent],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        CatalogRoutingModule,
    ],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    bootstrap: [AppComponent],
})
export class AppRoutingModule {}
