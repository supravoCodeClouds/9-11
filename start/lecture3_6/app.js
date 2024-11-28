import * as THREE from '../../libs/three126/three.module.js'; // Importing Three.js library
import { OrbitControls } from '../../libs/three126/OrbitControls.js'; // Importing orbit controls for camera

class App{
	constructor(){
		const container = document.createElement( 'div' ); // Creating a div container
		document.body.appendChild( container ); // Adding container to the body
		
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 ); // Setting up perspective camera
		this.camera.position.set( 0, 0, 4 ); // Positioning the camera

		this.scene = new THREE.Scene(); // Creating a new scene
		this.scene.background = new THREE.Color( 0xaaaaaa ); // Setting background color

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3); // Adding ambient light
		this.scene.add(ambient); // Adding ambient light to scene

		const light = new THREE.DirectionalLight(); // Creating directional light
		light.position.set( 0.2, 1, 1); // Positioning the light
		this.scene.add(light); // Adding directional light to scene

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Setting up renderer
		this.renderer.setPixelRatio( window.devicePixelRatio ); // Adjusting renderer for display
		this.renderer.setSize( window.innerWidth, window.innerHeight ); // Setting renderer size
		container.appendChild( this.renderer.domElement ); // Adding renderer to container

		const geometry = this.createStarGeometry(); // Creating star-shaped geometry
		const material = new THREE.MeshStandardMaterial( { color: 0xFF0000 }); // Setting up material

		this.mesh = new THREE.Mesh( geometry, material ); // Creating mesh with geometry and material
		this.scene.add(this.mesh); // Adding mesh to the scene

		const controls = new OrbitControls( this.camera, this.renderer.domElement ); // Adding orbit controls for camera

		this.renderer.setAnimationLoop(this.render.bind(this)); // Setting up animation loop
		window.addEventListener('resize', this.resize.bind(this) ); // Adding event listener for window resize
	}

	createStarGeometry(innerRadius = 0.4, outerRadius = 0.8, points = 5) {
		const shape = new THREE.Shape(); // Creating a new shape for the star
		const PI2 = Math.PI * 2; // Defining full circle in radians
		const inc = PI2 / (points * 2); // Angle increment for star points

		shape.moveTo(outerRadius, 0); // Moving to the first outer point
		let inner = true; // Setting inner flag for alternation

		for (let theta = inc; theta < PI2; theta += inc) { // Looping through points
			const radius = inner ? innerRadius : outerRadius; // Choosing radius based on inner/outer flag
			shape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius); // Drawing line to next point
			inner = !inner; // Alternating between inner and outer points
		}

		const extrudeSettings = { // Defining extrusion settings for 3D effect
			steps: 1, // Number of steps for extrusion
			depth: 0.2, // Depth of extrusion
			bevelEnabled: true, // Enabling bevel for edges
			bevelThickness: 0.05, // Bevel thickness
			bevelSize: 0.05, // Bevel size
			bevelSegments: 1 // Number of bevel segments
		};

		return new THREE.ExtrudeGeometry(shape, extrudeSettings); // Creating and returning extruded star geometry
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight; // Adjusting camera aspect ratio
		this.camera.updateProjectionMatrix(); // Updating camera projection
		this.renderer.setSize(window.innerWidth, window.innerHeight); // Adjusting renderer size
	}

	render() {
		this.mesh.rotateY(0.01); // Rotating mesh on Y-axis
		this.renderer.render(this.scene, this.camera); // Rendering the scene with the camera
	}
}

export { App }; // Exporting the App class
