import { Line } from "./line";
import { Axis } from "./axis";
import { Snapshot } from "./snapshot";
import { LineStyles } from "./line-styles.enum";
import { isRegExp } from "util";

export class PlotterData {

    lines: Line[];
    axes: Axis[];
    snapshots: Snapshot[];
    
    constructor(){

        this.lines = [
            {
                points: [
                 
                    { x:-10, y:-10 },
                    { x: 10, y:10 }
                ],
                //lineStyle: LineStyles.SOLID,
                color: "rgb(0,100,20)",
                thickness: .1
            }
        ];

        this.axes = [
            {
                coordinate: 0,
                isX: true
            },{
                coordinate: 0,
                isX: false
            }

        ];

        this.snapshots = [];

    }

    




}
