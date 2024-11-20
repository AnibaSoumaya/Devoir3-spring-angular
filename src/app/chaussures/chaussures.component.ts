import {  Component, OnInit } from '@angular/core';

import { ChaussuresService } from '../service/chaussures.service';
import { chaussure } from '../model/chaussure';
import { AuthService } from '../service/auth.service';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-chaussures',
  templateUrl: './chaussures.component.html',
  styleUrls: ['./chaussures.component.css']
})
export class ChaussuresComponent  implements OnInit{

  
  chaussures! : chaussure[]; //un tableau de chaînes de caractères 

  images !:Image
  imageStr!:string;

  constructor(private ChaussureService: ChaussuresService,
              public authService: AuthService) 


  { 
    //this.chaussures = ChaussureService.listeChaussures(); 
  } 
  ngOnInit(){

    /*this.ChaussureService.listeChaussures().subscribe(chauss => {
    console.log(chauss);
    this.chaussures = chauss;
    });*/
    this.chargerChaussures();
  }
/*
  chargerChaussures() {
    this.ChaussureService.listeChaussures().subscribe(chauss => {
      console.log(chauss);
      this.chaussures = chauss;
      this.chaussures.forEach((chaus) => {
        this.ChaussureService
          .loadImage(chaus.image.idImage)
          .subscribe((img: Image) => {
            chaus.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    });
  }*/

    chargerChaussures() {
      this.ChaussureService.listeChaussures().subscribe(chauss => {
        console.log('Données reçues:', chauss);
        this.chaussures = chauss;
        this.chaussures.forEach((chaus) => {
          if (chaus.images && chaus.images.length > 0) {
            chaus.imageStr = 'data:' + chaus.images[0].type + ';base64,' + chaus.images[0].image;
          } else {
            chaus.imageStr = ''; // Valeur par défaut si aucune image n'est disponible
          }
        });
      });
    }

  supprimerChaussure(c: chaussure) 
  { 
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.ChaussureService.supprimerChaussure(c.idChaussure).subscribe(() => {
      console.log("chaussure supprimé");
      this.chargerChaussures();
});
  } 

}
