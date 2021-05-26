import { ProdutoMaisVendidoDTO } from './../../shared/models/produto-mais-vendido-dto';
import { EstatisticaService } from './../../shared/services/estatistica.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-grafico-produto-mais-vendidos',
  templateUrl: './grafico-produto-mais-vendidos.component.html',
  styleUrls: ['./grafico-produto-mais-vendidos.component.scss'],
})
export class GraficoProdutoMaisVendidosComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  quatidadeVendidas: number[] = [];
  produtos: string[] = [];

  constructor(private estatisticaService: EstatisticaService) {}

  ngOnInit(): void {
    this.estatisticaService.buscarProdutosMaisVendidos().subscribe((data) => {
      const produtosVendidos: ProdutoMaisVendidoDTO[] = data.content;

      for (let i = 0; i < produtosVendidos.length; i++) {
        const produtoVendido = produtosVendidos[i];
        this.produtos.push(produtoVendido.nome);
        this.quatidadeVendidas.push(produtoVendido.totalVendido);

        this.chartOptions = {
          series: [
            {
              name: "Total vendido",
              data: this.quatidadeVendidas
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#546E7A",
            "#26a69a",
            "#D10CE8"
          ],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          grid: {
            show: false
          },
          xaxis: {
            categories: this.produtos,
            labels: {
              style: {
                colors: [
                  "#008FFB",
                  "#00E396",
                  "#FEB019",
                  "#FF4560",
                  "#775DD0",
                  "#546E7A",
                  "#26a69a",
                  "#D10CE8"
                ],
                fontSize: "12px"
              }
            }
          }
        };
      }
    });
  }
}
