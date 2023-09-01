import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 0.2;

const ambientLight = new THREE.AmbientLight( 0xffffff, 3 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 3);
pointLight.position.set( 5, 5, 5 );
scene.add( pointLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

loader.load( 'taphandles.glb', function ( gltf ) {

    gltf.scene.scale.set( 0.5, 0.5, 0.5 );
    scene.add( gltf.scene );
    gltf.camera = camera;

    // Get the bounding box of the object
    const box = new THREE.Box3().setFromObject( gltf.scene );

    // Calculate the center of the bounding box
    const center = new THREE.Vector3();
    box.getCenter( center );

    // Set the target of the OrbitControls to the center of the object
    controls.target = center;

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, function ( error ) {

    console.error( error );

} );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 0.1;
controls.maxDistance = 10;

function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();

}

animate();