import * as THREE from '../../libs/three126/three.module.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

		// Camera setup
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
		this.camera.position.set(0, 0, 4);

		// Scene setup
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xAAAAAA);

		// Renderer setup with shadow support
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMap.enabled = true;  // Enable shadows
		container.appendChild(this.renderer.domElement);

		// Add OrbitControls to enable drag-to-rotate
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		// Animation loop
		this.renderer.setAnimationLoop(this.render.bind(this));

		//globe creation
		const geometry = new THREE.SphereGeometry(1,64,64);
		const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.castShadow = true;
		this.scene.add(this.mesh);

		// Football hexagons
		const hexagonGeometry = new THREE.CircleGeometry(0.1, 6); // Hexagon shape
		const hexagonMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
		for (let i = 0; i < 12; i++) {
		  const hexagon = new THREE.Mesh(hexagonGeometry, hexagonMaterial);
		  const theta = i * Math.PI / 6; // angle to place each hexagon
		  const x = Math.cos(theta) * 1.2; // Position on the sphere
		  const z = Math.sin(theta) * 1.2;
		  hexagon.position.set(x, -0.05, z); // Adjust positioning as needed
		  hexagon.rotation.set(0, Math.PI / 2, 0); // Rotate the hexagons to face outward
		  this.mesh.add(hexagon); // Attach to the sphere
		}
	

		// Light setupss
		const light = new THREE.AmbientLight(0xFFFFFF, 0.5); // soft white light
		this.scene.add(light);
		const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
		directionalLight.position.set(1, 1, 1);
		this.scene.add(directionalLight);

		// Resize listener
		window.addEventListener('resize', this.resize.bind(this) );
	}

	resize(){ //window resize korleo cube ta cube e thakbe and cuboid hoye jabena
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	render() {
		this.mesh.rotateY(-0.01); 
		this.renderer.render(this.scene, this.camera);
	}
}

export { App };
