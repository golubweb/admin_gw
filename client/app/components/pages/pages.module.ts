import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';

import PagesComponent        from './pages.component';
import HomePageComponent     from './home-page.component';
import AnyPageComponent      from './any-page.component';
import PageNotFoundComponent from './page-not-found.component';

import PagesService from './services/pages.service';
import LayoutModule from '../layout/layout.module';

const PagesRoutesModule: any[] = [
    {
        path: 'page',
        component: PagesComponent,
        children: [
            { path: 'home-page', component: HomePageComponent },
            { path: ':id',       component: AnyPageComponent },
            { path: '**',        component: PageNotFoundComponent }
        ],
    }
];

@NgModule({
    imports:      [
        CommonModule,
        LayoutModule,
        RouterModule.forRoot(PagesRoutesModule)
    ],
    declarations: [
        PagesComponent,
        HomePageComponent,
        AnyPageComponent,
        PageNotFoundComponent
    ],
    providers:    [ PagesService ],
    schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
    exports:      [ PagesComponent ]
})
export default class PagesModule { }
