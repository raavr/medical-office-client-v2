import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  OnChanges
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../core/styles/shared.scss', './profile.component.scss']
})
export class ProfileComponent implements OnChanges {
  @Input() profile: User;
  @Input() pending: boolean;

  @Output() onProfileSaved = new EventEmitter<User>();
  @Output() onAvatarChanged = new EventEmitter<FormData>();

  @ViewChild('fileInput') file: ElementRef<any>;

  ngOnChanges() {
    this.form.setValue({
      name: this.profile.name,
      surname: this.profile.surname,
      email: this.profile.email
    });
  }

  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    surname: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.email, Validators.required])
  });

  onFileSelected() {
    if (this.file.nativeElement.files[0]) {
      const formData = new FormData();
      formData.append('avatar', this.file.nativeElement.files[0]);
      this.onAvatarChanged.emit(formData);
    }
  }

  saveProfile() {
    if (this.form.valid) {
      this.onProfileSaved.emit(this.form.value);
    }
  }

  constructor(private fb: FormBuilder) {}
}
