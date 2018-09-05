
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginModel} from '../../../models/login.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.css']
})
export class LoginModalComponent {
  @Input() id: number;
  loginForm: FormGroup;
  model: LoginModel = new LoginModel();

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    this.authService.login(this.model)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.activeModal.close();
    }, err => {
      console.log(err);
    });
  }
}
