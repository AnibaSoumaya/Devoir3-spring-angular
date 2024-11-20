import { Component } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { ChaussuresService } from '../service/chaussures.service';
import { chaussure } from '../model/chaussure';
import { LieuCreationChaussure } from '../model/LieuCreationChaussure';
import { Image } from '../model/image.model';

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

  uploadedImage!: File;
  imagePath: any;

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

  /*addChaussure()
  { 
    this.newChaussure.lieu = this.lieu.find(lieus => lieus.idLieu == this.newIdLieu)!;
    this.ChaussureService.ajouterChaussure(this.newChaussure)
    .subscribe(chauss => {
    console.log(chauss);
    this.router.navigate(['chaussures']);
    });
  }*/

    /*
  addChaussure() {
    this.ChaussureService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newChaussure.image = img;
        this.newChaussure.lieu = this.lieu.find(lieus => lieus.idLieu
          == this.newIdLieu)!;
        this.ChaussureService
          .ajouterChaussure(this.newChaussure)
          .subscribe(() => {
            this.router.navigate(['chaussures']);
          });
      });
  }*/

      addChaussure(){

        this.newChaussure.lieu= this.lieu.find(reg => reg.idLieu == this.newIdLieu)!;
          this.ChaussureService.ajouterChaussure(this.newChaussure).subscribe((chauss: chaussure) => {
              if (this.uploadedImage) {
                  this.ChaussureService.uploadImageChauss(this.uploadedImage, this.uploadedImage.name, chauss.idChaussure).subscribe(() => {
                      this.router.navigate(['chaussures']);
                  });
              } else {
                  this.router.navigate(['chaussures']);
              }
          });
        }


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }

  }
  


