import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SignupData } from '../../models/signup';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['../../../core/styles/card_shared.scss'],
})
export class SignupFormComponent {
  _pending: boolean;
  @Input() set pending(isPending) {
    isPending ? this.form.disable() : this.form.enable();
    this._pending = isPending;
  }
  @Output() submitForm = new EventEmitter<SignupData>();

  form = this.fb.group(
    {
      name: this.fb.control('', Validators.required),
      surname: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        ValidatorsService.passwordValidator
      ]),
      confirmPassword: this.fb.control('', Validators.required)
    },
    { validator: ValidatorsService.passwordMatcher }
  );

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
