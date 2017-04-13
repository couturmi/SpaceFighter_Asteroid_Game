var scene, camera, renderer;
var movingRight, movingLeft, movingUp, movingDown;
var background, ship, sights;

init();
animate();

function init() {

    //initialize variables
    movingRight = false;
    movingLeft = false;
    movingUp = false;
    movingDown = false;

    //initialize scene
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $(document).ready(mouseOver);
    window.addEventListener("keydown", keyboardDownHandler, false);
    window.addEventListener("keyup", keyboardUpHandler, false);

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

    //ship follows lazer sights
    ship.rotation.x = (((sights.position.y/(window.innerHeight/2))/2)/Math.PI) + Math.PI*1.5;
    ship.rotation.z = (-(sights.position.x/(window.innerWidth/2))/2)/Math.PI;

    //checks if ship should move
    adjustShipPostition();

    //move background
    background.rotation.y += 0.001;

    renderer.render( scene, camera );

}

function mouseOver() {
    $(document).mousemove(function(event){
        //mouse controls lazer sights
        document.body.style.cursor = 'none';
        sights.position.x = 3.55*(-window.innerWidth/2 + event.pageX);
        sights.position.y = 3.55*(window.innerHeight/2 - event.pageY);
    });
}

function keyboardDownHandler(event) {
    switch (event.key) {
        case "d":
            movingRight = true;
            break;
        case "a":
            movingLeft = true;
            break;
        case "w":
            movingUp = true;
            break;
        case "s":
            movingDown = true;
            break;
    }
}

function keyboardUpHandler(event) {
    switch (event.key) {
        case "d":
            movingRight = false;
            break;
        case "a":
            movingLeft = false;
            break;
        case "w":
            movingUp = false;
            break;
        case "s":
            movingDown = false;
            break;
    }
}

function adjustShipPostition() {
    if(movingRight){
        if(ship.position.x <= (window.innerWidth))
            ship.position.x += 10;
    }
    if(movingLeft){
        if(ship.position.x >= (-window.innerWidth))
            ship.position.x += -10;
    }
    if(movingUp){
        if(ship.position.y <= (window.innerHeight*1.25))
            ship.position.y += 10;
    }
    if(movingDown){
        if(ship.position.y >= (-window.innerHeight*1.25))
            ship.position.y += -10;
    }
}
