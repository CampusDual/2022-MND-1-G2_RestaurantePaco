import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuseditComponent } from './menusedit.component';

describe('MenuseditComponent', () => {
  let component: MenuseditComponent;
  let fixture: ComponentFixture<MenuseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuseditComponent ]
    })
    .compileComponents();
  });
    
  beforeEach (() => {
    fixture = TestBed.createComponent(MenuseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

