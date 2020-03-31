import { Component, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { Covid19hnService } from './services/covid19hn.service';


am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data = null;
  totales: number;
  activosTot: number;
  RecuperdadosTot: number;
  muertosTot: number;
  constructor(private zone: NgZone,
              public covid19Casos: Covid19hnService) { 
                this.data = null;
              }
  title = 'coviMapHn';



  ngAfterViewInit() {
    
    this.covid19Casos.getCasosCovid().subscribe(data => {
      console.log('Consulta data: ' + JSON.stringify(data));
      this.data = data;
      console.log(this.data);
      this.zone.runOutsideAngular(() => {
        const chart = am4core.create('chartdiv', am4charts.XYChart);

        chart.data = this.data;
        this.totales = this.data.reduce((sum, value) => (typeof value.casos === 'number' ? sum + value.casos : sum), 0);


        this.activosTot = this.data.reduce((sum, value) => (typeof value.activos === 'number' ? sum + value.activos : sum), 0);


        this.RecuperdadosTot = this.data.reduce((sum, value) => (typeof value.recuperados === 'number' ? sum + value.recuperados : sum), 0);


        this.muertosTot = this.data.reduce((sum, value) => (typeof value.muertos === 'number' ? sum + value.muertos : sum), 0);



        // Create axes
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'departamento';
        categoryAxis.title.text = 'Casos por Departamento';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 40;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'casos';
        series.dataFields.categoryX = 'departamento';
        series.name = ('Casos Totales: ' + this.totales);
        series.tooltipText = 'Casos: [bold]{valueY}[/]';
        // This has no effect
        // series.stacked = true;

        const series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = 'activos';
        series2.dataFields.categoryX = 'departamento';
        series2.name = 'Activos: ' + this.activosTot;
        series2.tooltipText = 'Activos: [bold]{valueY}[/]';
        // Do not try to stack on top of previous series
        // series2.stacked = true;

        const series3 = chart.series.push(new am4charts.ColumnSeries());
        series3.dataFields.valueY = 'muertos';
        series3.dataFields.categoryX = 'departamento';
        series3.name = 'Muertos: ' + this.muertosTot;
        series3.tooltipText = 'Muertos: [bold]{valueY}[/]';
        series3.stacked = true;
        const series4 = chart.series.push(new am4charts.ColumnSeries());
        series4.dataFields.valueY = 'recuperados';
        series4.dataFields.categoryX = 'departamento';
        series4.name = 'Recuperados: ' + this.RecuperdadosTot;
        series4.tooltipText = 'Recuperados: [bold]{valueY}[/]';
        series4.stacked = true;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.scrollbarX = new am4core.Scrollbar();
        // Add legend
        chart.legend = new am4charts.Legend();

        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.align = 'left';
        chart.exporting.menu.verticalAlign = 'top';
        chart.responsive.enabled = true;

      });







    });



  }

}
