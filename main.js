import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();

}

animate();
});
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();

const elementForModel = document.getElementById('model');

renderer.setSize( window.innerWidth, window.innerHeight );
elementForModel.appendChild( renderer.domElement );

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

      // Force the canvas to scale properly
  const canvas = renderer.domElement;
  const container = canvas.parentElement;
  const modelWrapper = document.querySelector('canvas').parentElement;

  const resizeRenderer = function() {
    const width = modelWrapper.clientWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  
    const scrollPosition = window.scrollY;
    const distanceFromTop = modelWrapper.getBoundingClientRect().top;
    const visiblePercent = Math.max(0, Math.min(1, (window.innerHeight - distanceFromTop) / modelWrapper.offsetHeight));
  
    if (visiblePercent >= 0.1) {
      let newWidth = width + (distanceFromTop * 0.5) - scrollPosition;
  
      if (newWidth < 600) {
        newWidth = 600;
      }
  
      gsap.to(modelWrapper, {
        width: newWidth,
        duration: 1,
        ease: 'power2.out'
      });
    }
  };
  
  window.addEventListener('resize', resizeRenderer);
  window.addEventListener('scroll', resizeRenderer);
  resizeRenderer();
 // Add a rotation animation to the model
 const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#model',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onEnter: () => {
        gsap.to('body, html', {
            
        });
      },
      onLeaveBack: () => {
        gsap.to('body, html', {
          overflow: 'auto'
        });
      }
    }
  });
  tl.to(gltf.scene.rotation, {
    y: Math.PI * 2,
    duration: 1
  });


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
controls.enableZoom = false;

