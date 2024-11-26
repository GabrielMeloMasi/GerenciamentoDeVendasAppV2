import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(
      (data) => {
        this.produtos = data;
        console.log('Dados carregados:', this.produtos); // Log após carregar
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }
  
  
}
