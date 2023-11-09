import Point from "./point.js";

class ConvexHull {
    constructor(points) {
        this.p0; // starting point
        this.points = points;

        return this.convexHull();
    }

    getStartPoint() {
        let minY = -1;
        let minIdx = -1;
        this.points.forEach((pt, idx) => {
            if (pt.y > minY || (pt.y === minY && pt.x < this.points[minIdx])) {
                // if there's a tie, takes the left-most point
                minY = pt.y;
                minIdx = idx;
            }
        });
        // place the bottom-most at the start of `points` array (by destructuring)
        [this.points[0], this.points[minIdx]] = [this.points[minIdx], this.points[0]]
        return this.points[0];
    }

    getOrientation(A, B, C) {
        // Compute the cross product of the two vectors AB & AC
        const cross = (B.y - A.y) * (C.x - B.x) - (B.x - A.x) * (C.y - B.y);
        if (cross === 0) {
            // points are collinears
            return 0;
        } else if (cross > 0) {
            // clockwise
            return 1;
        } else {
            // counter clockwise
            return -1;
        }
    }

    clean() {
        let temp = [this.points[0]];
        for (let i = 1; i <= this.points.length - 2; i++) {
            // get orientation between p0-p[i] and p0-p[i+1]
            let crossP = this.getOrientation(this.p0, this.points[i], this.points[i + 1]);
            if (crossP === 0) {
                // => points are collinear, only keep the farthest
                if (this.p0.sqDist(this.points[i]) > this.p0.sqDist(this.points[i + 1])) {
                    temp.push(this.points[i]);
                }
            } else {
                temp.push(this.points[i])
            }
        }
        temp.push(this.points[this.points.length - 1]);
        return temp;
    }

    convexHull() {
        if (this.points.length === 3) {
            // triangle, which is a convex hull !
            return this.points;
        }
        // Find the point with the lowest y-coordinate.
        // If the lowest y-coordinate exists in more than one point in the set, the point with the lowest x-coordinate out of the candidates should be chosen.
        this.p0 = this.getStartPoint();

        // sort the array by polar angle in CCW order, relative to point p0
        this.points.sort((p1, p2) => {
            const orient = this.getOrientation(this.p0, p1, p2);
            if (orient === 0) {
                if (this.p0.sqDist(p2) >= this.p0.sqDist(p1)) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return orient;
            }
        });

        // clean the array : if two more points have the same angle, then only keep the point farthest from p0
        this.points = this.clean();

        // We need at least 3 points
        if(this.points.length <3) return false;

        // always look at 3 succesive points in the stack
        let stack = [this.p0, this.points[1], this.points[2]];
        // if the 3 points make a CW turn (getOrientation returns 1), remove the middle point
        for (let i = 3; i < this.points.length; i++) {
            while (true) {
                if (stack.length < 2) break;
                if (this.getOrientation(stack[stack.length - 2], stack[stack.length - 1], this.points[i]) !== 1) break;
                stack.pop();
            }
            stack.push(this.points[i]);
        }
        return stack;
    }
}

export default ConvexHull;