import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,0.1,1000);

const orbit=new OrbitControls(camera,renderer.domElement);

const axesHelper=new THREE.AxesHelper(3);
scene.add(axesHelper);
camera.position.set(-10,30,30);
orbit.update();


const boxGeometry=new THREE.BoxGeometry();
const boxMaterial=new THREE.MeshStandardMaterial({color:'red'});
const box=new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const planeGeometry=new THREE.PlaneGeometry(30,30);
const planeMaterial=new THREE.MeshStandardMaterial({color:'white',side:THREE.DoubleSide});
const plane=new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x=-0.5*Math.PI;

const gridHelper=new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry=new THREE.SphereGeometry(4,50,50);
const sphereMaterial=new THREE.MeshStandardMaterial({color:'blue',wireframe:true});
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);

const ambientLight=new THREE.AmbientLight(0x333333,0.5);
scene.add(ambientLight)

const gui=new dat.GUI();

const options={
    sphereColor:'#ffea00',
    wireframe:true,
    speed:0.01
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
})
gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe=e;
})
gui.add(options,'speed',0,0.1);
let step=0;


function animate(time){
    box.rotation.x=time/1000;
    box.rotation.y=time/1000;
    step+=options.speed;
    //sphere.position.x=10*Math.abs(Math.sin(step));
    sphere.position.y=10*Math.abs(Math.sin(step));
    sphere.position.z=15*Math.abs(Math.sin(step));
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

