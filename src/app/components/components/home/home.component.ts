import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import deepai from 'deepai';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileName: string = '';
  imgSrc: string = environment.IMG_BASE;
  imgTitle: string = 'Imagem preto e branco ou imagem colorida';
  uploadProgress: boolean = false;

  result: any;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    this.uploadProgress = true;
    const file: File = event.target.files[0];
    this.preview(file)
    this.uploadProgress = false;
  }

  async deepaiColorize(file: HTMLInputElement): Promise<void> {
  
    this.uploadProgress = true;
    deepai.setApiKey(environment.YOUR_API_KEY);
    this.result = await deepai.callStandardApi("colorizer", {
      image: file
    });
    this.imgSrc = this.result.output_url;
    this.uploadProgress = false;
  }

  private preview(file: File) {
    if (file) {

      this.fileName = file.name;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      }
    }
  }
}
