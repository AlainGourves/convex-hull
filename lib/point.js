/**
 * Represents a 2D point with x and y coordinates.
 */
class Point {
    /**
     * @constructor
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculates the square distance to another point.
     *
     * @param {Point} other - The other point to calculate the distance to.
     * @returns {number} The square distance between this point and the other point.
     */
    sqDist(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        return dx * dx + dy * dy;
    }

    /**
     * Calculates the Euclidean distance to another point.
     *
     * @param {Point} other - The other point to calculate the distance to.
     * @returns {number} The Euclidean distance between this point and the other point.
     */
    dist(other) {
        return Math.sqrt(this.sqDist(other));
    }
}

export default Point;
