import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromProfile from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import * as fromRoot from '../../../core/reducers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { ProfileSave, ProfileUpdateAvatar } from '../../actions/profile.action';
import { ChangePassword } from '../../actions/password.action';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let store: Store<fromProfile.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
          accounts: combineReducers(fromProfile.reducers)
        })
      ],
      declarations: [AccountComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a ProfileSave action on form submit', () => {
    component.user = { id: '1', name: 'PrevTest' };
    const newProfile: User = { id: '1', name: 'Test' };
    const action = new ProfileSave({
      prevProfile: component.user,
      newProfile
    });

    component.onProfileSaved(newProfile);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a ProfileUpdateAvatar action on avatar changed', () => {
    const avatar = new FormData();
    component.user = { id: '1', name: 'PrevTest' };
    const action = new ProfileUpdateAvatar({
      userId: component.user.id,
      avatar
    });

    component.onAvatarChanged(avatar);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a changePassword action on form submit', () => {
    const passwords = {
      oldPassword: 'test123',
      password: 'test1234',
      confirmPassword: 'test1234',
    };
    const action = new ChangePassword(passwords);

    component.onPasswordChanged(passwords);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
