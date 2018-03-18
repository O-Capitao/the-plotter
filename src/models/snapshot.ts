import { Line } from "./line";
import { Rectangle } from "./rectangle";

export interface Snapshot {
    id: string;
    lines: Line[];
    viewport: Rectangle;

}
