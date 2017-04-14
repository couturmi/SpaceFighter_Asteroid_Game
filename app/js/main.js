var scene, camera, renderer;
/* spaceship movement */
var movingRight, movingLeft, movingUp, movingDown;
/* single objects */
var background, ship, sights;
/* asteroid arrays and data */
var asteroidArray, asteroidCFArray, numOfAsteroids;
/* game data */
var totalScore, pointsForMiss, pointsForHit, level, timeLeft;
/* DOM objects */
var scoreElement, timeElement, levelElement;

init();
animate();

function init() {

    //initialize variables
    movingRight = false;
    movingLeft = false;
    movingUp = false;
    movingDown = false;
    numOfAsteroids = 5;
    totalScore = 0;
    pointsForHit = 100;
    pointsForMiss = -50
    level = 1;

    //initialize scene
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    $(document).ready(mouseOver);
    window.addEventListener("mousedown", mouseDown, false);
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
    createNewAsteroids(numOfAsteroids);

    //set camera and add renderer
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 2000;
    document.body.appendChild( renderer.domElement );

    //Create score text
    scoreElement = document.createElement( 'span' );
    scoreElement.innerHTML = 'Score: '+totalScore;
    scoreElement.id = "score";
    document.body.appendChild(scoreElement);

    //Create level text
    levelElement = document.createElement( 'span' );
    levelElement.innerHTML = 'Level '+level;
    levelElement.id = "level";
    document.body.appendChild(levelElement);

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
        asteroidArray[i].object.position.x = Math.floor(Math.random() * ((4.1573*window.innerWidth) - 1.5*asteroid.values.radius) - (2.0787*window.innerWidth)+ 0.75*asteroid.values.radius);
        asteroidArray[i].object.position.y = Math.floor(Math.random() * ((4.1573*window.innerHeight) - 1.5*asteroid.values.radius) - (2.0787*window.innerHeight)+ 0.75*asteroid.values.radius);

        //add CF and add to scene
        asteroidCFArray.push(new THREE.Matrix4());
        scene.add(asteroidArray[i].object);
    }
}

function nextLevel() {
    if(asteroidArray.length == 0){
        level++;
        levelElement.innerHTML = 'Level '+level;
        if(level % 5 == 1) {
            numOfAsteroids++;
        }
        createNewAsteroids(numOfAsteroids);
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

function mouseDown(event) {
    //loop through asteroids
    for(var i = 0; i < asteroidArray.length; i++){
        //if within X Range of asteroid
        if(event.pageX >= (window.innerWidth/2 + 0.21*asteroidArray[i].object.position.x) - 0.21*asteroidArray[i].values.radius &&
            event.pageX <= (window.innerWidth/2 + 0.21*asteroidArray[i].object.position.x) + 0.21*asteroidArray[i].values.radius){
            //if within Y Range of asteroid
            if(event.pageY >= (window.innerHeight/2 - 0.21*asteroidArray[i].object.position.y) - 0.21*asteroidArray[i].values.radius &&
                event.pageY <= (window.innerHeight/2 - 0.21*asteroidArray[i].object.position.y) + 0.21*asteroidArray[i].values.radius){
                //blow up asteroid!!!
                scene.remove(asteroidArray[i].object);
                asteroidArray.splice(i, 1);
                asteroidCFArray.splice(i, 1);
                totalScore += pointsForHit;
                scoreElement.innerHTML = 'Score: '+totalScore;

                //if all asteroids have been cleared, go to next level
                nextLevel();

                return;
            }
        }
    }

    //if no asteroids were hit, you missed. Subtract points from score
    if(totalScore+pointsForMiss >= 0) {
        totalScore += pointsForMiss;
        scoreElement.innerHTML = 'Score: ' + totalScore;
    }
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
