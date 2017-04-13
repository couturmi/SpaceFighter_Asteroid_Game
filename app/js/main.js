var scene, camera, renderer;
var background, ship;

init();
animate();

function init() {

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    const lightOne = new THREE.DirectionalLight (0xFFFFFF, 1.0);
    lightOne.position.set (10, 40, 100);
    // lightOne.position.set (0, 0, 10000);
    scene.add (lightOne);

    ship = new SpaceFighter();
    scene.add(ship);

    background = new SpaceBackground();
    scene.add(background);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 2000;

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    ship.rotation.x += 0.01;
    background.rotation.y += 0.001;

    renderer.render( scene, camera );

}
