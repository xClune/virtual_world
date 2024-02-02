class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    // adds the new point to the list.
    addPoint(point) {
        this.points.push(point);
    }

    // loops through all existing points in graph.points and checks if new point equals them (returns true if so).
    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    // if containsPoint() returns true this function returns false and doesnt create a new point. If containsPoint() did not return true, then the new point does not equal any existing and gets added through calling the addPoint() function. 
    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        } else {
            return false;
        }
    }

    // adds the new segment to list.
    addSegment(seg) {
        this.segments.push(seg);
    }

    // loops through all existing segments in graph.segments and checks if new segment equals them (returns true if so).
    containsSegment(seg) {
        return this.segments.find((s) => s.equals(seg));
    }

    // if containsSegment() returns true this function returns false and doesnt create a new point. If containsSegment() did not return true, then the new point does not equal any existing and gets added through calling the addSegment() function.
    tryAddSegment(seg) {
        if (!this.containsSegment(seg)) {
            this.addSegment(seg);
            return true;
        } else {
            return false;
        }
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}