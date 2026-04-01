import { TestBed } from '@angular/core/testing';

import { Cliente } from './models/cliente';

describe('Cliente', () => {
  let service: Cliente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cliente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
