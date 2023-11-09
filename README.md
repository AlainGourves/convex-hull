![Hull example](hull.png)
# Convex Hull

This library computes the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of a set of points.

It uses the [Graham scan](https://en.wikipedia.org/wiki/Graham_scan) algorithm.


## Installation

Copy `./lib/points.js` and `./lib/convexHull.js` files.

Point objects

## Usage

```js
import ConvexHull from './lib/convexHull.js';

let points =[
    new Point(17, 16),
    new Point(35, 4),
    new Point(26, 45),
    new Point(43, 25),
    new Point(65, 21),
];

let hull = new ConvexHull(points);
console.log(hull);
```
Result :

```js
[
  Point { x: 26, y: 45 },
  Point { x: 17, y: 16 },
  Point { x: 35, y: 4 },
  Point { x: 65, y: 21 }
]
```

## The future

Implement other algorithms, like [Quickhull](https://en.wikipedia.org/wiki/Quickhull).