import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChaussuresService } from '../service/chaussures.service';
import { chaussure } from '../model/chaussure';
import { LieuCreationChaussure } from '../model/LieuCreationChaussure';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-chaussure',
  templateUrl: './update-chaussure.component.html',
  styleUrls: ['./update-chaussure.component.css']
})
export class UpdateChaussureComponent implements OnInit {
  currentChaussure = new chaussure();
  lieu: LieuCreationChaussure[] = [];
  updatedIdLieu!: number;
  myImage: string = '';

  uploadedImage!: File;
  isImageUpdated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ChaussureService: ChaussuresService
  ) {}

  ngOnInit(): void {
    // Charger la liste des lieux
    this.ChaussureService.listelieu().subscribe((lieus) => {
      this.lieu = lieus;
      console.log('Lieux:', lieus);
    });

    // Charger les informations de la chaussure en cours d'édition
    const chaussureId = this.activatedRoute.snapshot.params['id'];
    this.ChaussureService.consulterChaussure(chaussureId).subscribe((chauss) => {
      this.currentChaussure = chauss;
      this.updatedIdLieu = this.currentChaussure.lieu.idLieu;

      // Charger l'image principale si disponible
      if (this.currentChaussure.images?.length > 0) {
        const firstImage = this.currentChaussure.images[0];
        this.myImage = `data:${firstImage.type};base64,${firstImage.image}`;
      }

      console.log('Chaussure chargée:', this.currentChaussure);
    });
  }

  updateChaussure(): void {
    // Associer le lieu sélectionné à la chaussure
    const selectedLieu = this.lieu.find((lieu) => lieu.idLieu === this.updatedIdLieu);
    if (selectedLieu) {
      this.currentChaussure.lieu = selectedLieu;
    }

    if (this.isImageUpdated) {
      // Si une nouvelle image a été uploadée, mettre à jour l'image avant la chaussure
      this.ChaussureService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
        this.currentChaussure.image = img;
        this.saveChaussure();
      });
    } else {
      this.saveChaussure();
    }
  }

  private saveChaussure(): void {
    this.ChaussureService.updateChaussure(this.currentChaussure).subscribe(() => {
      this.router.navigate(['chaussures']);
    });
  }

  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;

      // Prévisualiser l'image uploadée
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImageChaussure(): void {
    this.ChaussureService
      .uploadImageChauss(this.uploadedImage, this.uploadedImage.name, this.currentChaussure.idChaussure)
      .subscribe((img: Image) => {
        this.currentChaussure.images.push(img);
      });
  }

  supprimerImage(img: Image): void {
    const conf = confirm('Etes-vous sûr de vouloir supprimer cette image ?');
    if (conf) {
      this.ChaussureService.supprimerImage(img.idImage).subscribe(() => {
        // Retirer l'image supprimée du tableau local
        const index = this.currentChaussure.images.indexOf(img);
        if (index > -1) {
          this.currentChaussure.images.splice(index, 1);
        }
      });
    }
  }
}
