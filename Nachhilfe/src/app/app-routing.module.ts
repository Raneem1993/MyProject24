import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StartseiteComponent } from './components/startseite/startseite.component';
import { TableComponent } from './components/table/table.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddComponent } from './components/add/add.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { LoginComponent } from './components/login/login.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: DetailComponent },
  { path: 'users', component: RegisterComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'startseite', component: StartseiteComponent,canActivate: [AuthguardGuard] },
  { path: 'table', component: TableComponent },
  { path: 'student/:id', component: DetailComponent },
  { path: 'students', component: AddComponent },



]




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
