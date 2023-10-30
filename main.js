import * as THREE from 'three';

let scene, camera, renderer;

// シーンを追加する
scene = new THREE.Scene();

// カメラを追加
camera = new THREE.PerspectiveCamera(
  50, // 視野角
  window.innerWidth / window.innerHeight, // アスペクト比
  0.1, // 開始距離
  1000 // 終了距離
);

// レンダラーを追加
renderer = new THREE.WebGL1Renderer({
  alpha: true // 背景色を透過させる
});
// レンダラーのサイズを変更：画面サイズに合わせる
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);