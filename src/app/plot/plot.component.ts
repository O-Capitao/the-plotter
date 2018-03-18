import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Rectangle } from '../../models/rectangle';
import { PlotterData } from '../../models/plotter-data';
import { Line } from '../../models/line';
import { Point } from '../../models/point';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Axis } from '../../models/axis';
import { LineComponent } from './line/line.component';
import { LineStyles } from '../../models/line-styles.enum';
@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
  ngAfterViewInit(): void {
  }

  @ViewChild("top") topContainer: ElementRef;

  constructor() {
    this.bounds = {
      lowerLeft:{ x:-10,y:-10},
      upperRight: {x:10,y:10}
    }

    this.data = new PlotterData();
    
  }

  data: PlotterData;
  bounds: Rectangle;
  gridStep: number;

  pixelHeight: "600";
  pixelWidth: "1400";

  aspectRaio: number;
  showGrid: boolean;

  gridResolution: number;

  axisX0:Axis;
  axisY0:Axis;

  gridLines:Axis[];

  ngOnInit() {
    // grab the master container
    this.pixelHeight = this.topContainer.nativeElement.offsetHeight;
    this.pixelWidth = this.topContainer.nativeElement.offsetWidth;
    
    this.initView();
    this.initGrid();

    console.log("Master Container: w:" + this.pixelWidth + "px h:" + this.pixelHeight + "px" );
    console.log("bounds ---> " + JSON.stringify( this.bounds ));
  }

  private initView(): void {
    let champion:Rectangle;
    this.data.lines.forEach(
      line => {
        let allX = line.points.map( p => p.x );
        let allY = line.points.map( p => p.y );

        let candidate:Rectangle = {
          upperRight: {
            x:Math.max(...allX), y:Math.max(...allY)
          },
          lowerLeft: {
            x:Math.min(...allX), y:Math.min( ...allY) 
          }
        }

        if (champion){
          champion.lowerLeft.x = (candidate.lowerLeft.x < champion.lowerLeft.x) ? candidate.lowerLeft.x : champion.lowerLeft.x;
          champion.lowerLeft.y = (candidate.lowerLeft.y < champion.lowerLeft.y) ? candidate.lowerLeft.y : champion.lowerLeft.y;
          champion.upperRight.x = (candidate.upperRight.x > champion.upperRight.x) ? candidate.upperRight.x : champion.upperRight.x;
          champion.upperRight.y = (candidate.upperRight.y > champion.upperRight.y) ? candidate.upperRight.y : champion.upperRight.y;
        }else{
          champion = candidate;
        }
      }
    );
    if (champion){
      this.bounds = champion;
    }
    this.gridStep = Math.floor(Math.max( this.bounds.upperRight.x - this.bounds.lowerLeft.x ,   this.bounds.upperRight.y - this.bounds.lowerLeft.y)/10 );
  }

  private initGrid(): void {
    this.axisX0 = {
      coordinate: 0 ,
      isX: true
    };

    this.axisY0 = {
      coordinate: 0,
      isX: false
    };
  }

  public renderGridLine(axis:Axis): Line {
    if (axis.isX){
      return {
        color: "rgb(255,255,255)",
        lineStyle: LineStyles.DASHED,
        thickness: 1,
        points: [
          { x: this.bounds.lowerLeft.x , y: axis.coordinate },
         { x: this.bounds.upperRight.x , y: axis.coordinate }
        ]
      }
    }else{
      return {
        color: "rgb(255,255,255)",
        lineStyle: LineStyles.DASHED,
        thickness: 1,
        points: [
          { x: axis.coordinate, y:this.bounds.lowerLeft.y },
          { x: axis.coordinate, y:this.bounds.upperRight.y }
        ]
      }
    }
  }


  getViewBox() {
    if (this.bounds && this.gridStep) {
      //let lL=this.transformPoint( this.bounds.lowerLeft  );
      //let uR = this.transformPoint( this.bounds.upperRight );

      let lL = this.bounds.lowerLeft ;

      return ( lL.x - this.gridStep )
      + " " + ( lL.y - this.gridStep )
      + " " + ( this.bounds.upperRight.x - this.bounds.lowerLeft.x + 2 * this.gridStep )  
      + " " + ( this.bounds.upperRight.y - this.bounds.lowerLeft.y + 2 * this.gridStep );
    }
    return "0 0 10 10";
  }

  getPath(line:Line){

    let _points = line.points;//this.transformForCanvas(line);

    let pathString = "M " + _points[0].x + " " + _points[0].x + " ";

    _points.slice(1).forEach( point => {
      pathString += "L " + point.x + " " + point.y + " ";
    });

    return pathString;
  }
}
