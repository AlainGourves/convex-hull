class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Square distance to anoyher Point
    sqDist(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        return dx * dx + dy * dy;
    }

    // Euclidian distance
    dist(other){
        return Math.sqrt(this.sqDist(other));
    }
}

export default Point;
