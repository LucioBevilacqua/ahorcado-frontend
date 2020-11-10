import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoLetraComponent } from './ahorcado-letra.component';

describe('AhorcadoLetraComponent', () => {
  let component: AhorcadoLetraComponent;
  let fixture: ComponentFixture<AhorcadoLetraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorcadoLetraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorcadoLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
