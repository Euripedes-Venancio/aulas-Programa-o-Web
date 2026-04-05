import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDetalhado } from './produto-detalhado';

describe('ProdutoDetalhado', () => {
  let component: ProdutoDetalhado;
  let fixture: ComponentFixture<ProdutoDetalhado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhado],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalhado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
