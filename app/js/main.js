var scene, camera, renderer;
var ship;

init();
animate();

function init() {

    scene = new THREE.Scene();

    const lightOne = new THREE.DirectionalLight (0xFFFFFF, 1.0);
    lightOne.position.set (10, 40, 100);
    scene.add (lightOne);

    ship = new SpaceFighter();
    scene.add(ship);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    ship.rotation.x += 0.01;

    renderer.render( scene, camera );

}
