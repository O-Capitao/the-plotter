import { Point } from "./point";
import { Color } from "./color";
import { LineStyles } from "./line-styles.enum";

export interface Line {
    points: Point[];
    color ?: string;
    lineStyle ?: LineStyles;
    thickness ?: number;
}
