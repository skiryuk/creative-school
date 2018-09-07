
import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './add-event.modal.html',
  styleUrls: ['./add-event.modal.css']
})
export class AddEventModalComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  isLoading = false;
  croppedImage: any;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.cropImage(this.selectedFiles[0], (image) => {
      this.croppedImage = image;
    });
  }

  upload() {
    this.isLoading = true;
    this.dataService.createEvent(this.croppedImage).subscribe(event => {
      if (event instanceof HttpResponse) {
        const res = JSON.parse(event.body as any);
        this.isLoading = false;
        this.activeModal.close(res.id);
      }
    }, err => {
      this.isLoading = false;
      console.log('Произошла ошибка при создании мероприятия');
    });
  }

  // Ресайзим изображение до 340x250
  cropImage(file, callback) {
    const width = 340;
    const height = 250;
    const sourceImage = new Image();
    sourceImage.src = URL.createObjectURL(file);
    sourceImage.onload = function () {
      const canvas = document.createElement('canvas');
      const naturalWidth = sourceImage.naturalWidth;
      const naturalHeight = sourceImage.naturalHeight;

      if (naturalWidth < naturalHeight) {
        const ratio = naturalWidth / naturalHeight;
        canvas.width = height * ratio;
        canvas.height = height;
        canvas.getContext('2d').drawImage(sourceImage, 0, 0, height * ratio, height);
      } else {
        if (naturalHeight < naturalWidth) {
          const ratio = naturalHeight / naturalWidth;
          canvas.width = width;
          canvas.height = width * ratio;
          canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, width * ratio);
        } else {
          canvas.width = width;
          canvas.height = width;
          canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, width);
        }
      }

      canvas.toBlob((blob) => {
        callback(blob);
      }, file.type);
    };
  }
}
