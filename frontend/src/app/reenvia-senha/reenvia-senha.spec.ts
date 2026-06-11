import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenviaSenha } from './reenvia-senha';

describe('ReenviaSenha', () => {
  let component: ReenviaSenha;
  let fixture: ComponentFixture<ReenviaSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReenviaSenha],
    }).compileComponents();

    fixture = TestBed.createComponent(ReenviaSenha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
