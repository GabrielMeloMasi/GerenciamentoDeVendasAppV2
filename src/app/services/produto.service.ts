import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/comercial/produtoREST/listProduto';

  constructor(private http: HttpClient) {}
  getProdutos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  finalizarVenda(venda: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/comercial/vendas/finalizarVenda';
    return this.http.post(apiUrl, venda);
  }
  
}
