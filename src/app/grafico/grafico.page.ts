import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements AfterViewInit {
  vendasMensais = [
    { mes: 'Janeiro', quantidade: 100 },
    { mes: 'Fevereiro', quantidade: 120 },
    { mes: 'Março', quantidade: 90 },
    { mes: 'Abril', quantidade: 110 },
    { mes: 'Maio', quantidade: 150 },
    { mes: 'Junho', quantidade: 130 },
    { mes: 'Julho', quantidade: 140 },
    { mes: 'Agosto', quantidade: 160 },
    { mes: 'Setembro', quantidade: 170 },
    { mes: 'Outubro', quantidade: 180 },
    { mes: 'Novembro', quantidade: 190 },
    { mes: 'Dezembro', quantidade: 200 },
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createLineChart();
    this.createBarChart();
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
      } else {
        console.error('Falha ao obter o contexto do gráfico de linhas.');
      }
    } else {
      console.error('Elemento canvas para o gráfico de linhas não encontrado.');
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
      } else {
        console.error('Falha ao obter o contexto do gráfico de barras.');
      }
    } else {
      console.error('Elemento canvas para o gráfico de barras não encontrado.');
    }
  }
}
