import { Component, OnInit } from '@angular/core';
import { chaussure } from '../model/chaussure';
import { ChaussuresService } from '../service/chaussures.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit{

  chaussures!: chaussure[] ;
  searchTerm!: string;
  allChauss! : chaussure[];
  nomChauss!: string;

  constructor(private ChaussureService: ChaussuresService) { }

  ngOnInit(): void {
    this.ChaussureService.listeChaussures().subscribe(chauss => {
      console.log(chauss);
      this.chaussures = chauss;
      });
    
  }
  onKeyUp(filterText : string){
    this.chaussures = this.allChauss.filter(item =>
    item.nomChaussure!.toLowerCase().includes(filterText));
    }

  rechercherAliments() {
    this.ChaussureService.rechercherParNom(this.nomChauss).subscribe((chauss) => {
      this.chaussures = chauss;
      console.log(chauss);
    });



 
  }

}
