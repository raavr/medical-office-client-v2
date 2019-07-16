import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../../core/styles/card_shared.scss']
})
export class LoginFormComponent {
  private _pending: boolean;
  @Input() set pending(isPending) {
    isPending ? this.form.disable() : this.form.enable();
    this._pending = isPending;
  }
  @Output() submitForm = new EventEmitter<Credentials>();

  form = this.fb.group({
    email: this.fb.control('', Validators.email),
    password: this.fb.control('', Validators.required)
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
