import { Injectable } from '@angular/core';
import { LieuCreationChaussure } from '../model/LieuCreationChaussure';
import { chaussure } from '../model/chaussure';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};

@Injectable({
  providedIn: 'root'
})
export class ChaussuresService {

  apiURL: string = 'http://localhost:8080/chaussure/api';
  chaussures! : chaussure[]; //un tableau de chaînes de caractères 
  chaussure! :chaussure;
  lieu! : LieuCreationChaussure[];
  constructor(private http : HttpClient,
    private authService : AuthService
  ) 
  { /*
    this.lieu = [
      {idLieu:1 , pays : "france" , codeBar:123 },
      {idLieu:2 , pays : "États-Unis" , codeBar:321 }
    ]
    this.chaussures = 
    [ 
      {idChaussure : 1,  nomChaussure : "Addidas", prixChaussure: 300.600 , pointureChaussure: 38,couleurChaussure: "Blanc",
       lieuC : {idLieu:1 , pays : "france" , codeBar:123 }}, 
      {idChaussure : 2,  nomChaussure : "Nike", prixChaussure : 450 , pointureChaussure: 39, couleurChaussure:"Noir" , 
      lieuC : {idLieu:1 ,pays : "france" , codeBar:123 }}, 
      {idChaussure : 3,  nomChaussure :"Puma", prixChaussure : 250.999,pointureChaussure: 37, couleurChaussure: "Rouge" ,
       lieuC : {idLieu:2 , pays : "États-Unis" , codeBar:321 }},
      
    ];  */
  } 


  listeChaussures():  Observable<chaussure[]>
  {
    return this.http.get<chaussure[]>(this.apiURL+"/all");
  } 

  ajouterChaussure(chauss: chaussure):Observable<chaussure>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<chaussure>(this.apiURL+"/addchauss", chauss, {headers:httpHeaders});
  
  }

  listelieu(): Observable<LieuCreationChaussure[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<LieuCreationChaussure[]>(this.apiURL+"/lieu",{headers:httpHeaders});
  }

  consulterlieu( codeBar: number)
  {
    return this.lieu.find(lieu => lieu.codeBar == codeBar)!;
  }

  supprimerChaussure( id: number){ 
    const url =  `${this.apiURL}/delchauss/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
   } 


   consulterChaussure(id: number): Observable<chaussure> {
    const url =  `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<chaussure>(url,{headers:httpHeaders}); 
    }


    updateChaussure(chauss: chaussure): Observable<chaussure>
    {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.put<chaussure>(this.apiURL+"/updatechauss", chauss, {headers:httpHeaders});
    }


    trierChaussure(){ 
      this.chaussures = this.chaussures.sort((n1, n2) => {
        const idChaussure1 = n1.idChaussure ?? 0; // Utilisez 0 comme valeur par défaut si idProduit est undefined
        const idChaussure2 = n2.idChaussure ?? 0;
        
        if (idChaussure1 > idChaussure2) {
          return 1;
        }
        if (idChaussure1 < idChaussure2) {
          return -1;
        }
        return 0;
      });
   
    } 

      rechercherParCategorie(idLieu: number):Observable< chaussure[]> {
        const url = `${this.apiURL}/chausslieu/${idLieu}`;
        let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<chaussure[]>(url, {headers:httpHeaders});
      }

      rechercherParNom(nom: string):Observable< chaussure[]> {
        const url = `${this.apiURL}/chaussByName/${nom}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<chaussure[]>(url, {headers:httpHeaders});
        }
        /*aaaa*/

        uploadImage(file: File, filename: string): Observable<Image>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${this.apiURL+ '/image/upload'}`;
          return this.http.post<Image>(url, imageFormData);
          }
          
        loadImage(id: number): Observable<Image> {
          const url = `${this.apiURL + '/image/get/info'}/${id}`;
          return this.http.get<Image>(url);
          }



        uploadImageChauss(file: File, filename: string, idChauss:number): Observable<any>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${this.apiURL + '/image/uplaodImageChauss'}/${idChauss}`;
          return this.http.post(url, imageFormData);
        }

        supprimerImage(id : number) {
          const url = `${this.apiURL}/image/delete/${id}`;
          return this.http.delete(url, httpOptions);
          }

   




   
}
