
import {Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {EventInfoModel} from '../../../models/event.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-event-modal',
  templateUrl: './add-event.modal.html',
  styleUrls: ['./add-event.modal.css']
})
export class AddEventModalComponent implements OnInit {

  selectedFiles: FileList;
  isLoading = false;
  croppedImage: any;
  model: EventInfoModel = new EventInfoModel();
  eventForm: FormGroup;

  ru: any;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private notifierService: NotifierService) {
    this.createForm();
  }

  ngOnInit() {
    this.ru = {
      firstDayOfWeek: 0,
      monthNames: ['Январь', 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Воск', 'Пон', 'Вт', 'Ср', 'Четв', 'Пят', 'Суб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      today: 'Сегодня',
      clear: 'Очистить'
    };
  }

  private createForm() {
    this.eventForm = this.formBuilder.group({
      dateField: null,
      titleField: '',
      descriptionField: '',
      priceField: null,
      fileField: null,
      abonementField: false
    });
  }

  selectFile(event) {
    /*this.isLoading = true;*/
    this.selectedFiles = event.target.files;
    /*this.cropImage(this.selectedFiles[0], (image) => {
      this.croppedImage = image;
      this.isLoading = false;
    });*/
  }

  add() {
    this.isLoading = true;
    this.dataService.addEvent(this.model, (this.selectedFiles && this.selectedFiles.length > 0) ? this.selectedFiles[0] : null)
      .subscribe(event => {
        if (event instanceof HttpResponse) {
          const res = JSON.parse(event.body as any);
          this.isLoading = false;
          this.model.id = res.id;
          this.notifierService.show({
            type: 'success',
            message: 'Занятие добавлено'
          });
          this.activeModal.close(this.model);
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

  onChangeType(type: string) {
    this.model.type = +type;
  }
}
