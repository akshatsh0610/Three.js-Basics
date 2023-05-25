import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import stars from '../stars.jpg';
import nebula from '../nebula.jpg';
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled=true;
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
plane.receiveShadow=true;

const gridHelper=new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry=new THREE.SphereGeometry(4,50,50);
const sphereMaterial=new THREE.MeshStandardMaterial({color:'blue',wireframe:true});
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.castShadow=true;

const ambientLight=new THREE.AmbientLight(0xFFFFFF,0.5);
scene.add(ambientLight)

// const directionalLight=new THREE.DirectionalLight(0xFFFFFF,0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30,50,0);
// directionalLight.castShadow=true;
// directionalLight.shadow.camera.bottom=-15;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,3);
// scene.add(dLightHelper);

// const dLightShadowHelper=new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);

const spotLight=new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100,100,0);
spotLight.castShadow=true;
spotLight.angle=0.1;
const spotLightHelper=new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// scene.fog=new THREE.Fog(0xFFFFFF,0,200);
scene.fog=new THREE.FogExp2(0xFFFFFF,0.01);

//renderer.setClearColor(0xFFEA00);

const textureLoader=new THREE.TextureLoader();
// scene.background=textureLoader.load(stars);
const cubeTextureLoader=new THREE.CubeTextureLoader();
scene.background=cubeTextureLoader.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars
]);

const gui=new dat.GUI();

const options={
    sphereColor:'#ffea00',
    wireframe:true,
    speed:0.01,
    angle:0.1,
    penumbra:0,
    intensity:1
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
})
gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe=e;
})
gui.add(options,'speed',0,0.1);
gui.add(options,'angle',0,1);
gui.add(options,'penumbra',0,1);
gui.add(options,'intensity',0,1);
let step=0;


function animate(time){
    box.rotation.x=time/1000;
    box.rotation.y=time/1000;
    step+=options.speed;
    //sphere.position.x=10*Math.abs(Math.sin(step));
    sphere.position.y=10*Math.abs(Math.sin(step));
    //sphere.position.z=15*Math.abs(Math.sin(step));
    spotLight.angle=options.angle;
    spotLight.intensity=options.intensity;
    spotLight.penumbra=options.penumbra;
    spotLightHelper.update();
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

