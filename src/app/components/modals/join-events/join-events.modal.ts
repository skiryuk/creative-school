
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';
import {JoinEventModel} from '../../../models/join-event.model';
import {DataService} from '../../../services/data.service';
import {Utils} from '../../../utils/utils';

@Component({
  selector: 'app-join-events-modal',
  templateUrl: './join-events.modal.html',
  styleUrls: ['./join-events.modal.css']
})
export class JoinEventsModalComponent {
  @Input() id: number;
  model: JoinEventModel = new JoinEventModel();
  isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private notifierService: NotifierService
  ) {
  }

  joinEvent() {
    this.isLoading = true;
    this.dataService.joinEvent(this.model)
    .subscribe(res => {
      this.isLoading = false;
      this.notifierService.show({
        type: 'success',
        message: 'Вы успешно записаны на занятие'
      });
      this.activeModal.close();
    }, err => {
      this.isLoading = false;
      console.error(err);
      this.notifierService.show({
        type: 'error',
        message: JSON.stringify(err)
      });
    });
  }

  isValid() {
    return (this.model.email || this.model.phone) &&
      this.model.name &&
      (this.model.email ? Utils.isValidEmail(this.model.email) : true);
  }
}
