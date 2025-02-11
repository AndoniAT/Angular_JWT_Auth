import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDescriptionSkeletonComponent } from './input-description-skeleton.component';

describe('InputDescriptionSkeletonComponent', () => {
  let component: InputDescriptionSkeletonComponent;
  let fixture: ComponentFixture<InputDescriptionSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDescriptionSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDescriptionSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
