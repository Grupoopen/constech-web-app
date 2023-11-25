import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './shared/guard/authguard.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ListaComponent } from './components/lista/lista.component';
import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { EmpCrudComponent } from './components/emp-crud/emp-crud.component';
import {HeaderComponent} from "./pages/header/header.component";


const routes: Routes = [
  {path:'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path:'emp-crud', component:EmpCrudComponent,canActivate:[AuthGuard]},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {path: 'lista',component:ListaComponent,canActivate:[AuthGuard]},
  {path: 'companies',component:ListCompaniesComponent,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
