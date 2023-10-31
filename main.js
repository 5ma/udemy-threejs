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
camera.position.set(0, 0, +500);

// レンダラーを追加
renderer = new THREE.WebGL1Renderer({
  alpha: true // 背景色を透過させる
});
// レンダラーのサイズを変更：画面サイズに合わせる
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ジオメトリ(骨格のようなもの)を作成
let ballGeometry = new THREE.SphereGeometry(
  100, // 球体の半径
  64,  // widthSegments（ポリゴンの数、増やせば増やすほど球体に近づく）
  32   // heightSegment（ポリゴンの数、増やせば増やすほど球体に近づく）
);
// マテリアル(材質)を作成
// MeshPhysicalMaterialは光源を必要とするmaterial
let ballMaterial = new THREE.MeshPhysicalMaterial();
// メッシュ化してみよう
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
// 作成したメッシュをシーン上に追加する
scene.add(ballMesh);

// レンダリングしてみよう
renderer.render(scene, camera);