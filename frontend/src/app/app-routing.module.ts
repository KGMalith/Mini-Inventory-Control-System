import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import {ProductComponent} from './components/product/product.component';

const routes: Routes = [
  {
    path:'',component:CategoryComponent
  },  
  {
    path:'products',component:ProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
