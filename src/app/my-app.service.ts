import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  previewData = [];
  
  constructor() { }

  sendPreviewData(data) {
    this.previewData = data;
  }

  getPreviewData() {
    return this.previewData;
  }

}
