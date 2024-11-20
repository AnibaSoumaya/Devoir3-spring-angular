import { Image } from "./image.model";
import { LieuCreationChaussure } from "./LieuCreationChaussure";

export class chaussure { 
    idChaussure! : number; 
    nomChaussure! : string; 
    prixChaussure! : number;
    pointureChaussure! :number;
    couleurChaussure! :string; 
    lieu! : LieuCreationChaussure;
    image! : Image;
    imageStr!:string;

    images!: Image[];

    }  