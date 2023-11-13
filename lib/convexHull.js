import Point from "./point.js";

/**
 * Represents a Convex Hull generated from a set of points using the Graham's scan algorithm.
 */
class ConvexHull {
    /**
     * @constructor
     * @param {Point[]} points - The array of points for which to find the convex hull.
     */
    constructor(points) {
        this.p0; // starting point
        this.points = points;

        if (this.points.length < 3) {
            throw new Error("We need at least 3 points to compute a hull!");
        }
    }

    /**
     * Finds and returns the starting point for the convex hull computation.
     *
     * @returns {Point} The starting point for convex hull computation.
     */
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

    /**
     * Computes the orientation of three points (clockwise, counterclockwise, or collinear).
     *
     * @param {Point} A - The first point.
     * @param {Point} B - The second point.
     * @param {Point} C - The third point.
     * @returns {number} The orientation: 0 for collinear, 1 for clockwise, -1 for counterclockwise.
     */
    getOrientation(A, B, C) {
        // Compute the determinant of vectors AB & AC
        // note that it's the opposite of the "normal" computation, as the y-coordinate increases downwards on the screen
        const det = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
        if (det === 0) {
            // points are collinears
            return 0;
        } else if (det > 0) {
            // clockwise
            return 1;
        } else {
            // counter clockwise
            return -1;
        }
    }

    /**
     * Cleans the array of points by keeping only the farthest points in case of collinearity.
     *
     * @returns {Point[]} The cleaned array of points.
     */
    clean() {
        let temp = [this.points[0]];
        for (let i = 1; i <= this.points.length - 2; i++) {
            // get orientation between p0-p[i] and p0-p[i+1]
            let orient = this.getOrientation(this.p0, this.points[i], this.points[i + 1]);
            if (orient === 0) {
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

    /**
     * Computes the convex hull of the set of points using the Graham's scan algorithm.
     *
     * @returns {Point[]} The array of points representing the convex hull.
     */
    getPoints() {
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

        // clean the array : if two or more points have the same angle, then only keep the point farthest from p0
        this.points = this.clean();

        // We need at least 3 points
        if (this.points.length < 3) {
            throw new Error("We need at least 3 distinct points to compute a hull!");
        };

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