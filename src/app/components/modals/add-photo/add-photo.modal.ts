
import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './add-photo.modal.html',
  styleUrls: ['./add-photo.modal.css']
})
export class AddPhotoModalComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  isLoading = false;

  constructor(public activeModal: NgbActiveModal,
              private dataService: DataService,
              private notifierService: NotifierService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.isLoading = true;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.dataService.uploadImage(this.currentFileUpload).subscribe(event => {
      if (event instanceof HttpResponse) {
        const res = JSON.parse(event.body as any);
        this.isLoading = false;
        this.notifierService.show({
          type: 'success',
          message: 'Фото добавлено'
        });
        this.activeModal.close(res.id);
      }
    }, err => {
      this.isLoading = false;
      console.error(err);
      this.notifierService.show({
        type: 'error',
        message: err
      });
    });
  }
}
