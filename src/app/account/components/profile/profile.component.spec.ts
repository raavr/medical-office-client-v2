import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/auth/models/user';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profile: User;

  beforeEach(() => {
    profile = {
      sub: '1',
      name: 'Test',
      surname: 'Doe',
      email: 'test@doe.com'
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    component.profile = profile;
    fixture.detectChanges();

    spyOn(component, 'ngOnChanges').and.callThrough();
    spyOn(component.onProfileSaved, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the form values when ngOnChanges is called', () => {
    expect(component.ngOnChanges).not.toHaveBeenCalled();
    expect(component.form.value).toEqual({ name: '', surname: '', email: '' });

    component.ngOnChanges();

    expect(component.ngOnChanges).toHaveBeenCalled();
    expect(component.form.value).toEqual({
      name: profile.name,
      surname: profile.surname,
      email: profile.email
    });
  });

  it('should emit form values when the form is valid', () => {
    component.ngOnChanges();

    expect(component.onProfileSaved.emit).not.toHaveBeenCalled();
    component.saveProfile();
    expect(component.onProfileSaved.emit).toHaveBeenCalledWith(
      component.form.value
    );
  });

  it('should not emit form values when the form is invalid', () => {
    component.form.setValue({
      name: '',
      surname: '',
      email: 'test@'
    });
    expect(component.onProfileSaved.emit).not.toHaveBeenCalled();
    component.saveProfile();
    expect(component.onProfileSaved.emit).not.toHaveBeenCalled();
  });

  it('should disable the sumbit button when the form is invalid', () => {
    component.form.setValue({
      name: 'Test',
      surname: 'Test',
      email: ''
    });
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(component.form.invalid).toBe(true);
    expect(
      compiled.querySelector('button[type="submit"]').getAttribute('disabled')
    ).not.toBeNull();
  });

  it('should emit the avatar file if a file is selected', () => {
    const fakeFile = { name: 'Fakefile.jpg' };
    class FakeFormData {
      append = () => {};
    }
    const fakeFormData = new FakeFormData();
    spyOn(window, 'FormData' as any).and.returnValue(fakeFormData);
    spyOn(fakeFormData, 'append');
    spyOn(component.onAvatarChanged, 'emit');
    spyOn(component, 'onFileSelected').and.callThrough();
    component.file = {
      nativeElement: {
        files: [fakeFile]
      }
    };

    fixture.detectChanges();

    expect(component.onFileSelected).not.toHaveBeenCalled();
    component.onFileSelected();
    expect(component.onFileSelected).toHaveBeenCalled();
    expect(component.onAvatarChanged.emit).toHaveBeenCalledWith(fakeFormData);
    expect(fakeFormData.append).toHaveBeenCalledWith(
      'avatar',
      component.file.nativeElement.files[0]
    );
  });
});
