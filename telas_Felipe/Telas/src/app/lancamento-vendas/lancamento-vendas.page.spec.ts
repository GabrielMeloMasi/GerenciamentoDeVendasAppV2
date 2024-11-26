import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LancamentoVendasPage } from './lancamento-vendas.page';

describe('LancamentoVendasPage', () => {
  let component: LancamentoVendasPage;
  let fixture: ComponentFixture<LancamentoVendasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoVendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
