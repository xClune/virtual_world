class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    // using .includes() method, determines if segment points are the same or the exact reverse, returns true if so
    equals(seg) {
        return (this.includes(seg.p1) && this.includes(seg.p2));
    }

    // check if p1 or p2 equals the point being passed
    includes(point) {
        return this.p1.equals(point) || this.p2.equals(point);
    }

    length() {
        return distance(this.p1, this.p2);
    }

    directionVector() {
        return normalize(subtract(this.p2,this.p1));
    }

    distanceToPoint(point) {
        const proj = this.projectPoint(point);
        if (proj.offset > 0 && proj.offset < 1) {
            return distance(point, proj.point);
        }
        const distToP1 = distance(point, this.p1);
        const distToP2 = distance(point, this.p2);
        return Math.min(distToP1, distToP2);
        }

    projectPoint(point) {
        const a = subtract(point, this.p1); //vector
        const b = subtract(this.p2, this.p1); //vector p1-p2
        const normB = normalize(b); // unit vector dir p1-p2
        const scaler = dot(a, normB); // along p1-p2
        const proj = {
            point: add(this.p1, scale(normB, scaler)), // point in reference to segment p1-p2
            offset: scaler / magnitude(b), // p1 @ 0, p2 @ 1
        }
        return proj;
    }

    // draws from (.moveTo) p1 to (lineTo) p2
    // formatting of line
    draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.setLineDash(dash);
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.setLineDash([]);

    }
}