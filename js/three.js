import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js?module';
import { OrbitControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js?module';

const container = document.getElementById('three-container');
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom = true;
controls.enablePan = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

let object;

// Load GLB
const loader = new GLTFLoader();
loader.load(
  'models/Covid19/covid19-virus.glb',
  gltf => {
    object = gltf.scene.clone();

    // Replace materials safely
    object.traverse(mesh => {
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: mesh.material?.color || 0xffffff,
          map: mesh.material?.map || null,
          emissive: mesh.material?.emissive || new THREE.Color(0x000000),
          metalness: mesh.material?.metalness || 0,
          roughness: mesh.material?.roughness || 1,
          transparent: mesh.material?.transparent || false,
          opacity: mesh.material?.opacity ?? 1
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Scale object to fit container
    const scale = 1 / maxDim;
    object.scale.setScalar(scale);

    // Recompute bounding box after scaling
    box.setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);

    scene.add(object);

    // Position camera
    camera.position.set(0, 0, 2.5); 
    camera.lookAt(0, 0, 0);

    console.log('GLB loaded, centered, scaled');
  },
  xhr => console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`),
  err => console.error(err)
);

// Left-click rotation
let isRotating = false;
document.addEventListener('mousedown', e => { if (e.button === 0) isRotating = true; });
document.addEventListener('mouseup', e => { if (e.button === 0) isRotating = false; });

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

function animate() {
  requestAnimationFrame(animate);
  if (object && isRotating) {
    object.rotation.y = (mouseX / container.clientWidth - 0.5) * Math.PI * 2;
    object.rotation.x = (mouseY / container.clientHeight - 0.5) * Math.PI;
  }
  controls.update();
  renderer.render(scene, camera);
}

animate();
