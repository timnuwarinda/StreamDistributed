// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { HomeComponent } from './home.component';
import { Routes,RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const routes: Routes = [
  {path: '', component:HomeComponent}
];

@NgModule({
  declarations: [
    NavigationComponent,
    HomeComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PdfViewerModule



  ],    
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeModule { }
