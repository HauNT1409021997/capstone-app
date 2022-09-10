import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorInputComponent } from './form-error-input.component';

describe('FormErrorInputComponent', () => {
  let component: FormErrorInputComponent;
  let fixture: ComponentFixture<FormErrorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
