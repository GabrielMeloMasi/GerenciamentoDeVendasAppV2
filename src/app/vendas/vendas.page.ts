import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.page.html',
  styleUrls: ['./vendas.page.scss'],
})
export class VendasPage implements OnInit {
  produtos: any[] = []; // Lista de produtos disponíveis
  carrinho: any[] = []; // Lista de produtos no carrinho
  total: number = 0; // Valor total da venda
  dataVenda: string = new Date().toISOString(); // Data da venda inicializada com a data atual

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    // Carrega os produtos do back-end
    this.produtoService.getProdutos().subscribe(
      (data) => {
        this.produtos = data;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  adicionarAoCarrinho(produto: any) {
    const itemExistente = this.carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      // Se o produto já está no carrinho, aumenta a quantidade
      itemExistente.quantidade++;
      itemExistente.valor += produto.precoVenda;
    } else {
      // Caso contrário, adiciona o produto ao carrinho
      this.carrinho.push({
        id: produto.id,
        nome: produto.nomeProduto,
        quantidade: 1,
        preco: produto.precoVenda,
        valor: produto.precoVenda,
      });
    }

    this.calcularTotal(); // Atualiza o total
  }

  removerDoCarrinho(produto: any) {
    const index = this.carrinho.findIndex((item) => item.id === produto.id);
    if (index > -1) {
      this.carrinho.splice(index, 1);
      this.calcularTotal();
    }
  }

  calcularTotal() {
    this.total = this.carrinho.reduce((acc, item) => acc + item.valor, 0);
  }

  finalizarVenda() {
    // Monta o objeto de venda
    const venda = {
      dataVenda: this.dataVenda, // Data escolhida pelo usuário
      qtd: this.carrinho.length,
      vlrTotal: this.total,
      produtos: this.carrinho.map((item) => ({
        id: item.id,
        qtdVenda: item.quantidade,
        vlrVenda: item.valor,
      })),
    };
  
    // Envia os dados para o back-end
    this.produtoService.finalizarVenda(venda).subscribe(
      (response) => {
        if (response.success) {
          console.log('Venda finalizada:', response);
          alert('Venda registrada com sucesso!');
          this.carrinho = []; // Limpa o carrinho no front-end
          this.total = 0; // Reseta o total
        } else {
          alert('Erro ao finalizar a venda: ' + response.message);
        }
      },
      (error) => {
        console.error('Erro ao finalizar a venda:', error);
        alert('Erro ao finalizar a venda.');
      }
    );
  }
  
}
