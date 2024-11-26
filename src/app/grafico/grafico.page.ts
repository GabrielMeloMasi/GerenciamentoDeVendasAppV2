import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements AfterViewInit {
  vendasMensais: { mes: string; quantidade: number }[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.carregarDadosVendas();
  }

  carregarDadosVendas(): void {
    this.produtoService.listarVendas().subscribe(
      (response) => {
        if (response.success) {
          this.processarDados(response.vendas);
          this.createLineChart();
          this.createBarChart();
        } else {
          console.error('Erro ao carregar vendas:', response.message);
        }
      },
      (error) => {
        console.error('Erro ao buscar vendas:', error);
      }
    );
  }

  processarDados(vendas: any[]): void {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const vendasAgrupadas: { [key: string]: number } = {};

    vendas.forEach((venda) => {
      const data = new Date(venda.dataVenda);
      const mes = meses[data.getMonth()]; // Obtém o nome do mês
      vendasAgrupadas[mes] = (vendasAgrupadas[mes] || 0) + venda.qtd;
    });

    this.vendasMensais = meses.map((mes) => ({
      mes,
      quantidade: vendasAgrupadas[mes] || 0,
    }));
  }

  createLineChart(): void {
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.vendasMensais.map((venda) => venda.mes),
            datasets: [
              {
                label: 'Quantidade Vendida (Mensal)',
                data: this.vendasMensais.map((venda) => venda.quantidade),
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.3)',
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Vendas Mensais - Gráfico de Linhas',
              },
            },
          },
        });
      }
    }
  }

  createBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.vendasMensais.map((venda) => venda.mes),
            datasets: [
              {
                label: 'Quantidade Vendida (Mensal)',
                data: this.vendasMensais.map((venda) => venda.quantidade),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Vendas Mensais - Gráfico de Barras',
              },
            },
          },
        });
      }
    }
  }

  voltarParaHome(): void {
    this.router.navigate(['/']); // Redireciona para a rota inicial
  }
}
