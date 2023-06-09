import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./authentication/auth/auth.component";
import {PlacesComponent} from "./places/places.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./authentication/auth-guard.service";
import {PreventAuthPageService} from "./authentication/prevent-auth-page.service";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [PreventAuthPageService] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [PreventAuthPageService]},
  { path: 'places', component: PlacesComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
