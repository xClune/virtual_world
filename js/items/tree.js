class Tree {
    constructor(center, size, heightCoef = 0.3) {
        this.center = center;
        this.size = size; // size of the base
        this.heightCoef = heightCoef;
        this.base = this.#generateLevel(center, size);
    }

    #generateLevel(point, size) {
        const points = [];
        const rad = size / 2;
        // loop in circle at intervals creating a new point between radius and 0.5 * radius, then generates polygon from these points. A 'spiky' circle is created for each level of the tree.
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
            const kindfOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2;
            const noisyRadius = rad * lerp(0.5, 1, kindfOfRandom);
            points.push(translate(point, a, noisyRadius));
        }
        return new Polygon(points);
    }

    draw(ctx, viewpoint) {
        // create a tree with a base and a number of levels

        // ref based on viewpoint position and tree position.
        const diff = subtract(this.center, viewpoint);

        // top of the tree
        const top = add(this.center, scale(diff, this.heightCoef));

        // draw levels of tree along the line from the center to the top
        const levelCount = 7;
        for (let i = 0; i < levelCount; i++) {
            const t = i / (levelCount - 1);
            const point = lerp2D(this.center, top, t);
            const color = "rgb(30," + lerp(50, 200, t) + ",70)";
            const size = lerp(this.size, 40, t);
            const poly = this.#generateLevel(point, size);
            poly.draw(ctx, { fill: color, stroke: "rgba(0,0,0,0)" });
        }
        // this.base.draw(ctx);
    }
}