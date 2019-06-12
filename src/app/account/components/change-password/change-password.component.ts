import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validator.service';
import { Passwords } from '../../model/passwords';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: [
    '../../../core/styles/shared.scss',
    './change-password.component.scss'
  ]
})
export class ChangePasswordComponent {
  @Input() pending: boolean;
  @Output() onPasswordChanged = new EventEmitter<Passwords>();

  @ViewChild('form') form;

  passwords = this.fb.group(
    {
      oldPassword: this.fb.control('', Validators.required),
      password: this.fb.control('', [
        Validators.required,
        ValidatorsService.passwordValidator
      ]),
      confirmPassword: this.fb.control('', Validators.required)
    },
    { validator: ValidatorsService.passwordMatcher }
  );

  changePassword() {
    if (this.passwords.valid) {
      this.onPasswordChanged.emit(this.passwords.value);
      this.form.resetForm();
    }
  }

  constructor(private fb: FormBuilder) {}
}
