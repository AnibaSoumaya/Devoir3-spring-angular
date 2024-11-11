import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class chaussureGuard implements CanActivate
 {  
  constructor (private authService: AuthService,               
                private router : Router) {}    
  canActivate(route: ActivatedRouteSnapshot,     
              state: RouterStateSnapshot):  boolean  
  { 
    if (this.authService.isAdmin())
      return true;
    else         
    {           
      this.router.navigate(['app-forbidden']);            
      return false; 
    } 
}

}