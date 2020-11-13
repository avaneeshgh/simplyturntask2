import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularNoteComponent } from './particular-note.component';

describe('ParticularNoteComponent', () => {
  let component: ParticularNoteComponent;
  let fixture: ComponentFixture<ParticularNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
