import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoProdutoMaisVendidosComponent } from './grafico-produto-mais-vendidos.component';

describe('GraficoProdutoMaisVendidosComponent', () => {
  let component: GraficoProdutoMaisVendidosComponent;
  let fixture: ComponentFixture<GraficoProdutoMaisVendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoProdutoMaisVendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoProdutoMaisVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
