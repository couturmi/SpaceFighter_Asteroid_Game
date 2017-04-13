var scene, camera, renderer;
var background, ship, sights;

init();
animate();

function init() {

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $(document).ready(mouseOver);

    //add lights
    const lightOne = new THREE.DirectionalLight (0xFFFFFF, 1.0);
    lightOne.position.set (10, 40, 100);
    scene.add (lightOne);
    const lightTwo = new THREE.DirectionalLight (0xFFFFFF, 1.0);
    lightTwo.position.set (0, 40, -100);
    scene.add (lightTwo);

    //add space background
    background = new SpaceBackground();
    scene.add(background);

    //add ship
    ship = new SpaceFighter();
    scene.add(ship);
    sights = new LazerSights();
    scene.add(sights);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 2000;

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    //ship.rotation.x += 0.01;
    ship.rotation.x = (((sights.position.y/(window.innerHeight/2))/2)/Math.PI) + Math.PI*1.5;
    ship.rotation.z = (-(sights.position.x/(window.innerWidth/2))/2)/Math.PI;
    // (Math.PI/(window.innerWidth))*
    background.rotation.y += 0.001;

    renderer.render( scene, camera );

}

function mouseOver() {
    $(document).mousemove(function(event){
        document.body.style.cursor = 'none';
        sights.position.x = 3.55*(-window.innerWidth/2 + event.pageX);
        sights.position.y = 3.55*(window.innerHeight/2 - event.pageY);
    });
}
