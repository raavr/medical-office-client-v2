import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['../../../core/styles/card_shared.scss']
})
export class ResetPasswordFormComponent {
  private _pending: boolean;
  @Input() set pending(isPending) {
    isPending ? this.form.disable() : this.form.enable();
    this._pending = isPending;
  }
  @Output() submitForm = new EventEmitter<string>();

  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email])
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
