import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProfileEffects } from './profile.effects';
import { ProfileService } from '../services/profile.service';

describe('ProfileEffects', () => {
  let actions$: Observable<any>;
  let effects: ProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        {
          provide: ProfileService,
          useValue: {
            updateProfile: () => {},
            uploadAvatar: () => {},
          }
        }
      ]
    });

    effects = TestBed.get(ProfileEffects);
  });

});
