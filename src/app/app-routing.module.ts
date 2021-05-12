import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component'
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: "home",
    pathMatch:"full"
  },
  {
    path:'addemployee',
    component: AddEmployeeComponent
  },
  {
    path:"home",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
