import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({color:'#468585', emissive:'#468585'})
const dodecahedron = new THREE.Mesh(geometry, material);

const boxgeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxmaterial = new THREE.MeshBasicMaterial({color:'#B4B4B3'})
const cube = new THREE.Mesh(boxgeometry, boxmaterial);
cube.position.y = -1.5;

scene.add(dodecahedron);
scene.add(cube)

const light = new THREE.SpotLight('#006769', 100);
light.position.set(1, 1, 1);
scene.add(light);

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.enableZoom = true;
controls.enablePan = true;


function animator(){
    requestAnimationFrame(animator);
    
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
    
    cube.rotation.x += 0.005;
    
    controls.update();
    
    renderer.render(scene, camera);

}

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window/innerHeight
    camera.updateProjectionMatrix();
    camera.setSize(window.innerWidth, window.innerHeight);
})

animator()