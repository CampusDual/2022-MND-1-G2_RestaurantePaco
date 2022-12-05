import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenushomeComponent } from './menushome.component';

describe('MenushomeComponent', () => {
  let component: MenushomeComponent;
  let fixture: ComponentFixture<MenushomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenushomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenushomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
