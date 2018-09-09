
import {Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReviewModel} from '../../../models/review.model';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-review-modal',
  templateUrl: './add-review.modal.html',
  styleUrls: ['./add-review.modal.css']
})
export class AddReviewModalComponent {

  isLoading = false;
  model: ReviewModel = new ReviewModel();
  reviewForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private notifierService: NotifierService) {
    this.createForm();
  }

  private createForm() {
    this.reviewForm = this.formBuilder.group({
      titleField: '',
    });
  }

  add() {
    this.isLoading = true;
    this.dataService.addReview(this.model.text)
      .subscribe(res => {
          this.isLoading = false;
          this.model.id = res.id;
          this.notifierService.show({
            type: 'success',
            message: 'Отзыв добавлен'
          });
          this.activeModal.close(this.model);
    }, err => {
      this.isLoading = false;
      console.error(err);
        this.notifierService.show({
          type: 'error',
          message: JSON.stringify(err)
        });
    });
  }
}
