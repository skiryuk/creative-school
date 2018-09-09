
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginModel} from '../../../models/login.model';
import {AuthService} from '../../../services/auth.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.css']
})
export class LoginModalComponent {
  @Input() id: number;
  loginForm: FormGroup;
  model: LoginModel = new LoginModel();
  isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.model)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.isLoading = false;
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
}
