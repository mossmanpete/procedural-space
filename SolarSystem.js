class SolarSystem extends THREE.Object3D {
	constructor(star, planets) {
		if (typeof star !== 'object' || !(star instanceof Star)) throw new TypeError('expected type of star was Star, got ' + typeof star);
		if (typeof planets !== 'object' || !Array.isArray(planets)) throw new TypeError('expected type of planets was Array, got ' + typeof planets);
		super();
		this.star = star;
		this.planets = planets;

		this.add(this.star);
		this.planets.forEach(p => p.orbitalPivot = this.star);
	}

	update(delta) {
		this.star.update(delta);
		this.planets.forEach(p => p.update(delta));
	}

	static generate({ star = { radius: THREE.Math.randInt(1500, 6000), rotationSpeed: 0 } } = {}) {
		if (!(star instanceof Star)) {
			star = new Star(star);
		}

		let planetCount = THREE.Math.randInt(3, 10);
		let planetRadiusMin = 300;
		let planetRadiusMax = 800;
		let nextPlanetPosX = star.radius;
		let planets = [];
		for (let i = 0; i < planetCount; i++) {
			let pos = i + 1;
			let planetRadius = THREE.Math.randInt(planetRadiusMin, planetRadiusMax);
			let planetColor = new THREE.Color().setHSL(Math.random(), 1, 0.5);
			let p = new Planet({
				radius: planetRadius,
				color: planetColor,
				orbitalSpeed: (Math.random() * (0.3 - 0.05) + 0.05) * 0.1,
				rotationSpeed: (0.1 * (planetCount / pos) + (Math.random() / 5 - 0.1)) * 0.01
			});
			nextPlanetPosX += planetRadius * 2 + THREE.Math.randInt(planetRadiusMax * 5, planetRadiusMax * 15);
			p.position.x = -nextPlanetPosX;
			planets[i] = p;
		}
		return new SolarSystem(star, planets);
	}
}
