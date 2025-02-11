import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSkeletonsComponent } from './posts-skeletons.component';

describe('PostsSkeletonsComponent', () => {
  let component: PostsSkeletonsComponent;
  let fixture: ComponentFixture<PostsSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsSkeletonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
