import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  imagem: string;
  descritivo: string;
  valor: number;
  estoque: number;
  keywords: string;
}

export interface ItemCarrinho {
  id: number;
  produtoId: number;
  nomeProduto: string;
  imagemProduto: string;
  valorUnitario: number;
  quantidade: number;
  subtotal: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  private base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ---- Auth ----

  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(`${this.base}/auth/cadastro`, { nome, email, senha });
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, { email, senha });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.base}/auth/logout`, {});
  }

  // ---- Produtos ----

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.base}/produtos`);
  }

  buscarProdutos(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.base}/produtos/buscar?termo=${encodeURIComponent(termo)}`);
  }

  buscarProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.base}/produtos/${id}`);
  }

  // ---- Carrinho ----

  listarCarrinho(email: string): Observable<ItemCarrinho[]> {
    return this.http.get<ItemCarrinho[]>(`${this.base}/carrinho?email=${encodeURIComponent(email)}`);
  }

  adicionarAoCarrinho(email: string, produtoId: number, quantidade: number): Observable<ItemCarrinho> {
    return this.http.post<ItemCarrinho>(`${this.base}/carrinho`, { email, produtoId, quantidade });
  }

  atualizarItem(itemId: number, quantidade: number): Observable<ItemCarrinho> {
    return this.http.put<ItemCarrinho>(`${this.base}/carrinho/${itemId}`, { quantidade });
  }

  removerItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.base}/carrinho/${itemId}`);
  }

  finalizarCompra(email: string): Observable<any> {
    return this.http.post(`${this.base}/carrinho/finalizar`, { email });
  }

  // ---- Sessão (sessionStorage — só para manter o usuário logado na aba) ----

  salvarSessao(nome: string, email: string) {
    sessionStorage.setItem('nome', nome);
    sessionStorage.setItem('email', email);
  }

  limparSessao() {
    sessionStorage.removeItem('nome');
    sessionStorage.removeItem('email');
  }

  getNome(): string | null { return sessionStorage.getItem('nome'); }
  getEmail(): string | null { return sessionStorage.getItem('email'); }
  isLogado(): boolean { return !!this.getEmail(); }
}
