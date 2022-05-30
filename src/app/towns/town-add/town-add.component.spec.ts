import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownAddComponent } from './town-add.component';

describe('TownAddComponent', () => {
  let component: TownAddComponent;
  let fixture: ComponentFixture<TownAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
