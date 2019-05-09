import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ToeggeliEffects } from './toeggeli.effects';

describe('ToeggeliEffects', () => {
  let actions$: Observable<any>;
  let effects: ToeggeliEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToeggeliEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ToeggeliEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
