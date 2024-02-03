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

    // draws from (.moveTo) p1 to (lineTo) p2
    // formatting of line
    draw(ctx, width = 2, color = "black") {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }
}