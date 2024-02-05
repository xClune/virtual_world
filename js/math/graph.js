class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load(info) {
        const points = info.points.map((i) => new Point(i.x, i.y));
        const segments = info.segments.map((i) => new Segment(points.find((p) => p.equals(i.p1)),
        points.find((p) => p.equals(i.p2))
        ));
        return new Graph(points, segments);
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

    removePoint(p) {
        const segs = this.getSegmentsWithPoint(p);
        for (const seg of segs) {
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(p), 1);
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
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            this.addSegment(seg);
            return true;
        } else {
            return false;
        }
    }

    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    getSegmentsWithPoint(point) {
        let segs = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segs.push(seg);
            }
        }    
        return segs;
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    updateCanvas() {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        graph.draw(ctx);
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