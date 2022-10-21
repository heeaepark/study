import * as THREE from 'three';


export default function example() {
console.log(THREE);

//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

//캔버스 크기 동적 조립
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ 
  canvas,
  antialias: true, //사물의 외곽을 부드럽게 하는 옵션 기본값은 false
});
renderer.setSize(window.innerWidth, window.innerHeight);

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  //시야각(field of view)
  75,
  //화면 종횡비율 (aspect)
  window.innerWidth / window.innerHeight,
  //가까워지면 사물이 안보이는 수치 (near)
  0.1,
  //멀어지면 사물이 안보이는 수치 (far)
  1000
);

camera.position.x = 1 //카메라 x축 위치값 설정
camera.position.y = 2 //카메라 y축 위치값 설정
camera.position.z = 5 //카메라 z축 위치값 설정
//무대 위 카메라 추가
scene.add(camera);


//Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000
  // color: '#ff0000'
  color: 'red'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)



// 그리기
renderer.render(scene, camera);

}