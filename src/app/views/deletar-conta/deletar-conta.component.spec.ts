import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarContaComponent } from './deletar-conta.component';

describe('DeletarContaComponent', () => {
  let component: DeletarContaComponent;
  let fixture: ComponentFixture<DeletarContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
