import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import earthTexture from './textures/earth.jpg';

let scene, camera, renderer, pointLight, controls;

window.addEventListener('load', init);

function init() {
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
    alpha: true, // 背景色を透過させる
  });
  // レンダラーのサイズを変更：画面サイズに合わせる
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // bodyに追加
  document.body.appendChild(renderer.domElement);

  // テクスチャを追加してみよう
  let texture = new THREE.TextureLoader().load(earthTexture);

  // ジオメトリ(骨格のようなもの)を作成
  let ballGeometry = new THREE.SphereGeometry(
    100, // 球体の半径
    64, // widthSegments（ポリゴンの数、増やせば増やすほど球体に近づく）
    32 // heightSegment（ポリゴンの数、増やせば増やすほど球体に近づく）
  );
  // マテリアル(材質)を作成
  // MeshPhysicalMaterialは光源を必要とするmaterial
  let ballMaterial = new THREE.MeshPhysicalMaterial({
    map: texture
  });

  // メッシュ化してみよう
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  // 作成したメッシュをシーン上に追加する
  scene.add(ballMesh);

  // 平行光源を追加
  // 第一引数は光の色、第二引数は光の強さ
  let directionalLight = new THREE.DirectionalLight(0xffffff, 3); // 0xというのはこれから16新数を書きますよということを表す
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ディレクショナルヘルパーを使って平行光源がどこにあるのかを特定する
  let directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight, // light
    100  // size
  );
  scene.add(directionalLightHelper);

  // ポイント光源を追加してみよう
  pointLight = new THREE.PointLight(0x646cff, 10000);
  pointLight.position.set(-100, -100, 50);
  scene.add(pointLight);

  // ポイント光源がどこにあるのかを特定する
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 10); // 第二引数はpointLightHelperの大きさを数値で指定
  scene.add(pointLightHelper);

  // マウス操作ができるようにしよう
  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener('resize', onWindowResize);

  animate();
}

// ブラウザのリサイズに対応させる
function onWindowResize() {
  // レンダラーのサイズをupdate
  renderer.setSize(innerWidth, innerHeight);

  // カメラのアスペクト比を正す
  camera.aspect = innerWidth / innerHeight;
  // カメラのアスペクト比を変更するときに必ず呼ばないといけない関数
  camera.updateProjectionMatrix();
}

function animate() {
  // ポイント光源を球の周りを巡回させる
  pointLight.position.set(
    150 * Math.sin(Date.now() / 500),
    150 * Math.sin(Date.now() / 1000),
    150 * Math.cos(Date.now() / 500),
  );

  // レンダリングしてみよう
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}