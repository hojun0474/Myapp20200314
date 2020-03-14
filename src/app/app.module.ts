import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
   declarations: [
      AppComponent,
      GridComponent,
      PreviewComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AgGridModule.withComponents([]),
      RouterModule.forRoot([
         {path: '', component: GridComponent},
         {path: 'preview', component: PreviewComponent}
      ])
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
