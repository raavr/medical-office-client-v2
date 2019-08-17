import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['../../../core/styles/card_shared.scss'],
})
export class NewPasswordFormComponent {
  private _pending: boolean;
  @Input() set pending(isPending) {
    isPending ? this.form.disable() : this.form.enable();
    this._pending = isPending;
  }
  @Output() submitForm = new EventEmitter<string>();

  form = this.fb.group(
    {
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
      this.submitForm.emit(this.form.value.password);
    }
  }
}
