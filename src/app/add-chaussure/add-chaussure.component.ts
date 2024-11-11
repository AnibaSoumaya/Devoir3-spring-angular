import { Component } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { ChaussuresService } from '../service/chaussures.service';
import { chaussure } from '../model/chaussure';
import { LieuCreationChaussure } from '../model/LieuCreationChaussure';

@Component({
  selector: 'app-add-chaussure',
  templateUrl: './add-chaussure.component.html',
  styleUrls: ['./add-chaussure.component.css']
})
export class AddChaussureComponent 
{
  lieu ! : LieuCreationChaussure[];
  newChaussure = new chaussure(); 
  newLieu! : LieuCreationChaussure;
  newIdLieu! : number;
  newcodeBar ! :number;
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,  
              private ChaussureService: ChaussuresService){} 
  
  ngOnInit() 
  {
    this.ChaussureService.listelieu().subscribe((lieus) => {
      this.lieu = lieus;
      console.log(lieus);
    
}
);
  }

  addChaussure()
  { 
    this.newChaussure.lieu = this.lieu.find(lieus => lieus.idLieu == this.newIdLieu)!;
    this.ChaussureService.ajouterChaussure(this.newChaussure)
    .subscribe(chauss => {
    console.log(chauss);
    this.router.navigate(['chaussures']);
    });
  }

  }
  


