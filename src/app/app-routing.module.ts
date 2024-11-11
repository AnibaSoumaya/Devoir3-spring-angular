import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaussuresComponent } from './chaussures/chaussures.component';
import { AddChaussureComponent } from './add-chaussure/add-chaussure.component';
import { UpdateChaussureComponent } from './update-chaussure/update-chaussure.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { chaussureGuard } from './chaussure.guard';
import { RechercheParLieuComponent } from './recherche-par-lieu/recherche-par-lieu.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';




const routes: Routes = [
  {path: "chaussures", component : ChaussuresComponent},

  {path : "add-chaussure", component : AddChaussureComponent, canActivate:[chaussureGuard]},
  {path: "", redirectTo: "chaussures", pathMatch: "full" },
  {path: "updateChaussure/:id",  component: UpdateChaussureComponent},
  {path:  'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent },
  {path: "rechercheParLieu", component : RechercheParLieuComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },
  {path: "rechercheParNom", component : RechercheParNomComponent},




  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
