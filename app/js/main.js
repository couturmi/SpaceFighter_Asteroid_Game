var scene, camera, renderer;
var movingRight, movingLeft, movingUp, movingDown;
var background, ship, sights;
var asteroidArray, asteroidCFArray;

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
    const lightTwo = new THREE.DirectionalLight (0xFFFFFF, 0.1);
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

    //add asteroids
    createNewAsteroids(5);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 2000;

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    //ship follows lazer sights
    ship.rotation.x = (((sights.position.y/(window.innerHeight/2))/2)/Math.PI) + Math.PI*1.5;
    ship.rotation.z = (-(sights.position.x/(window.innerWidth/2))/2)/Math.PI;

    //checks if ship should be moving
    adjustShipPostition();

    //rotate asteroids
    rotateAsteroids();

    //slowly rotates background
    background.rotation.y += 0.001;

    renderer.render( scene, camera );

}

function createNewAsteroids(count) {
    asteroidArray = [];
    asteroidCFArray = [];
    for(var i = 0; i < count; i++){
        //create asteroid
        let asteroid = new Asteroid();
        asteroidArray.push(asteroid);

        //randomize location
        // asteroidArray[i].object.position.y = Math.floor(Math.random() * (3*window.innerHeight - asteroid.values.radius) - (2.25*window.innerHeight)+ asteroid.values.radius);
        asteroidArray[i].object.position.x = Math.floor(Math.random() * ((4.1573*window.innerWidth) - 1.5*asteroid.values.radius) - (2.0787*window.innerWidth)+ 0.75*asteroid.values.radius);
        asteroidArray[i].object.position.y = Math.floor(Math.random() * ((4.1573*window.innerHeight) - 1.5*asteroid.values.radius) - (2.0787*window.innerHeight)+ 0.75*asteroid.values.radius);

        //add CF and add to scene
        asteroidCFArray.push(new THREE.Matrix4());
        scene.add(asteroidArray[i].object);
    }
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
    let shipSpeed = 20;
    if(movingRight){
        if(ship.position.x <= (window.innerWidth))
            ship.position.x += shipSpeed;
    }
    if(movingLeft){
        if(ship.position.x >= (-window.innerWidth))
            ship.position.x += -shipSpeed;
    }
    if(movingUp){
        if(ship.position.y <= (window.innerHeight*1.25))
            ship.position.y += shipSpeed;
    }
    if(movingDown){
        if(ship.position.y >= (-window.innerHeight*1.25))
            ship.position.y += -shipSpeed;
    }
}

function rotateAsteroids() {

    for(var i = 0; i < asteroidArray.length; i++) {
        let asteroidTrans = new THREE.Vector3();
        let asteroidRot = new THREE.Quaternion();
        const rotX = new THREE.Matrix4().makeRotationX(asteroidArray[i].values.xRot);
        const rotY = new THREE.Matrix4().makeRotationY(asteroidArray[i].values.yRot);
        asteroidCFArray[i].multiply(rotX);
        asteroidCFArray[i].multiply(rotY);
        asteroidCFArray[i].decompose(asteroidTrans, asteroidRot, new THREE.Vector3());  // decompose the coord frame

        asteroidArray[i].object.quaternion.copy(asteroidRot);
    }
}
