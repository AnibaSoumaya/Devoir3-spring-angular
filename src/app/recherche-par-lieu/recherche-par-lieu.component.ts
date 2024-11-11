import { Component, OnInit } from '@angular/core';
import { LieuCreationChaussure } from '../model/LieuCreationChaussure';
import { chaussure } from '../model/chaussure';
import { ChaussuresService } from '../service/chaussures.service';


@Component({
  selector: 'app-recherche-par-lieu',
  templateUrl: './recherche-par-lieu.component.html',
  styleUrls: ['./recherche-par-lieu.component.css']
})
export class RechercheParLieuComponent implements OnInit {

  idLieu! : number;
  lieu!: LieuCreationChaussure[] ;
  chaussures!: chaussure[] ;

  constructor(private ChaussureService: ChaussuresService) { }

  ngOnInit(): void {
    this.ChaussureService.listelieu().subscribe((lieus) => {
      console.log(lieus);
      this.lieu = lieus;
    });
  }

  onChange() {
    this.ChaussureService.rechercherParCategorie(this.idLieu).subscribe(chauss =>{this.chaussures=chauss});
}
  
}
