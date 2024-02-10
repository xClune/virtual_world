class Polygon {
    constructor(points) {
        this.points = points;
        this.segments = [];
        for (let i = 1; i <= points.length; i++) {
            this.segments.push(
                new Segment(points[i-1], points[i % points.length]) // using the % operator means that the for loop will loop back to segments[0] at the final iteration.
            );
        }
    }

    static load(info) {
        return new Polygon(
            info.points.map((i) => new Point(i.x, i.y))
            );
    }

    static union(polys) {
        Polygon.multiBreak(polys);
        const keptSegments = [];
        // loop through all polygons
        for (let i = 0; i < polys.length; i++) {
            // loop through all segments in polygon
            for (const seg of polys[i].segments) {
                let keep = true;
                for (let j = 0; j < polys.length; j++) {
                    // check if segment is within another polygon [j]
                    // if so keep = false and move to next iteration
                    if (i != j) {
                        if (polys[j].containsSegment(seg)) {
                            keep = false;
                            break;
                        }
                    }
                }
                // if no, segment is pushed to keptSegments array
                if (keep) {
                    keptSegments.push(seg);
                }
            }
        }
        return keptSegments;
    }

    static multiBreak(polys) {
        for (let i = 0; i < polys.length - 1; i++) {
            for (let j = i + 1; j < polys.length; j++) {
                Polygon.break(polys[i], polys[j]);
            }
        }
    }

    static break(poly1, poly2) {
        const segs1 = poly1.segments;
        const segs2 = poly2.segments;
        // loops all of the segments of one envelope against all of the segments of a second envelope and uses getIntersection function to display if there are any intersections between any two given segments.
        for (let i = 0; i < segs1.length; i++) {
           for (let j = 0; j < segs2.length; j++) {
            // will find intersections between segs1 polygon and segs2 polygon
            const int = getIntersection(
                segs1[i].p1, 
                segs1[i].p2, 
                segs2[j].p1, 
                segs2[j].p2)
            ; 
            // when intersection occurs, splices the array to create two separate segments either side of the intersection.
            if (int && int.offset != 1 && int.offset != 0) { // rules out cases where just either end of segments are touching.
                const point = new Point(int.x, int.y);
                let aux = segs1[i].p2;
                segs1[i].p2 = point;
                segs1.splice(i + 1, 0, new Segment(point, aux));
                aux = segs2[j].p2;
                segs2[j].p2 = point;
                segs2.splice(j + 1, 0, new Segment(point, aux));
               } 
           } 
        }
    }

    intersectsPoly(poly) {
        for (let s1 of this.segments) {
            for (let s2 of poly.segments) {
                if (getIntersection(s1.p1,s1.p2,s2.p1,s2.p2)) {
                    return true;
                }
            }
        }
        return false;
    }

    containsSegment(seg) {
        const midpoint = average(seg.p1, seg.p2);
        return this.containsPoint(midpoint);
    }

    containsPoint(point) {
        const outerPoint = new Point(-1000, -1000);
        let intersectionCount = 0;
        for (const seg of this.segments) {
            const int = getIntersection(outerPoint, point, seg.p1, seg.p2);
            if (int) {
                intersectionCount++;
            }
        }
        return intersectionCount % 2 == 1;
    }

    distanceToPoint(point) {
        return Math.min(...this.segments.map((s) => s.distanceToPoint(point)));
    }

    distanceToPoly (poly) {
        return Math.min(...this.points.map((p) => poly.distanceToPoint(p)));
    }
 
    drawSegments(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx, { color: getRandomColor(), width: 5});
        }
    }

    draw(
        ctx, 
        { stroke = "blue", lineWidth = 2, fill = "rgba(0,0,255,0.3)", join = "miter" } = {}) {
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = join;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}