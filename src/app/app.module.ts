import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChaussuresComponent } from './chaussures/chaussures.component';
import { AddChaussureComponent } from './add-chaussure/add-chaussure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateChaussureComponent } from './update-chaussure/update-chaussure.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RechercheParLieuComponent } from './recherche-par-lieu/recherche-par-lieu.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { TokenInterceptor } from './service/token.interceptor';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
//import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    ChaussuresComponent,
    AddChaussureComponent,
    UpdateChaussureComponent,
    LoginComponent,
    ForbiddenComponent,
    RechercheParLieuComponent,
    SearchFilterPipe,
    RechercheParNomComponent,
    RegisterComponent,
    VerifEmailComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    
   
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



