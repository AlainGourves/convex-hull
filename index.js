import Point from './lib/point.js';
import ConvexHull from './lib/convexHull.js';

const points = [
    new Point(301, 247),
    new Point(218, 219),
    new Point(237, 188),
    new Point(191, 142),
    new Point(239, 139),
    new Point(217, 90),
    new Point(280, 184),
    new Point(246, 39),
    new Point(279, 110),
    new Point(290, 56),
    new Point(320, 126),
    new Point(351, 27),
    new Point(362, 95),
    new Point(378, 64),
    new Point(415, 62),
    new Point(410, 99),
    new Point(387, 138),
    new Point(340, 203),
    new Point(378, 171),
    new Point(447, 128),
    new Point(436, 194),
    new Point(422, 228),
    new Point(375, 245)
];

const hull = new ConvexHull(points);
console.log(hull);