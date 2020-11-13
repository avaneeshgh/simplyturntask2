import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotemodalComponent } from './createnotemodal.component';

describe('CreatenotemodalComponent', () => {
  let component: CreatenotemodalComponent;
  let fixture: ComponentFixture<CreatenotemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenotemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenotemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
