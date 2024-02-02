class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    // returns true if seg equals segment in list or its opposite (second line).
    equals(seg) {
        return (this.p1.equals(seg.p1) && this.p2.equals(seg.p2)) || 
        (this.p1.equals(seg.p2) && this.p2.equals(seg.p1));
    }

    draw(ctx, width = 2, color = "black") {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }
}