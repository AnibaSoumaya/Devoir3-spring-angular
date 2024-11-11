import {  Component, OnInit } from '@angular/core';

import { ChaussuresService } from '../service/chaussures.service';
import { chaussure } from '../model/chaussure';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-chaussures',
  templateUrl: './chaussures.component.html',
  styleUrls: ['./chaussures.component.css']
})
export class ChaussuresComponent  implements OnInit{
  chaussures! : chaussure[]; //un tableau de chaînes de caractères 
  constructor(private ChaussureService: ChaussuresService,
              public authService: AuthService) 
  { 
    //this.chaussures = ChaussureService.listeChaussures(); 
  } 
  ngOnInit(){

    this.ChaussureService.listeChaussures().subscribe(chauss => {
    console.log(chauss);
    this.chaussures = chauss;
    });
  }

  chargerChaussures(){
    this.ChaussureService.listeChaussures().subscribe(chauss => {
    console.log(chauss);
    this.chaussures = chauss;
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
