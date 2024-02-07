class Envelope {
    constructor(skeleton,  width, roundness = 1) {
        this.skeleton = skeleton;
        this.poly = this.#generatePolygon(width, roundness);
    }

    #generatePolygon(width, roundness) {
        const { p1, p2 } = this.skeleton;

        const radius = width / 2;
        // angle of segment
        const alpha = angle(subtract(p1,p2));
        // 90 deg cw from angle
        const alpha_cw = alpha + Math.PI /2;
        // 90 deg ccw from angle
        const alpha_ccw = alpha - Math.PI /2;

        // creates 2 points at either side of segment ends at right angles to the segment direction
        // const p1_ccw = translate(p1, alpha_ccw, radius);
        // const p2_ccw = translate(p2, alpha_ccw, radius);
        // const p1_cw = translate(p1, alpha_cw, radius);
        // const p2_cw = translate(p2, alpha_cw, radius);

        const points = [];
        const step = Math.PI / Math.max(1, roundness);
        // create eps value to make sure to reach end of for loop below
        const eps = step / 2;
        // create points in a radius around original point from one angle to another.
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p1, i, radius));
        }
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p2, Math.PI + i, radius));
        }

        // generates polygon between 4 points above, creating an envelope around segment 'skeleton'
        return new Polygon(points);
    }

    draw(ctx, options) {
        this.poly.draw(ctx, options);
    }
}