/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RateTesComponent } from './rateTes.component';

describe('RateTesComponent', () => {
  let component: RateTesComponent;
  let fixture: ComponentFixture<RateTesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateTesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
