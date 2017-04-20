var scene, camera, renderer;
/* spaceship movement */
var movingRight, movingLeft, movingUp, movingDown;
/* single objects */
var background, ship, shipCF, sights, lazer;
/* asteroid arrays and data */
var asteroidArray, asteroidCFArray, numOfAsteroids, explosionArray;
/* game data */
var totalScore, pointsForMiss, pointsForHit, level, timer, timeStart, timeLeft,
    timeIncrement, gameEnded, lazerLocation, lazerShot, sightsMoved;
const TIME_MAX = 20;
/* DOM objects */
var scoreElement, timeElement1, timeElement2, levelElement, gameStartElement1, gameStartElement2, gameOverElement;

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
    pointsForMiss = -50;
    level = 1;
    timeStart = 5;
    timeLeft = timeStart;
    timeIncrement = 3;
    lazerLocation = 0;
    lazerShot = false;
    sightsMoved = false;
    explosionArray = [];

    //game is not active at start
    gameEnded = true;

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
    shipCF = new THREE.Matrix4();
    ship = new SpaceFighter();
    scene.add(ship);
    sights = new LazerSights();
    scene.add(sights);
    createLazer();

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

    //Create time text
    timeElement1 = document.createElement( 'span' );
    timeElement1.innerHTML = 'Time';
    timeElement1.id = "time1";
    document.body.appendChild(timeElement1);
    timeElement2 = document.createElement( 'span' );
    timeElement2.innerHTML = timeLeft;
    timeElement2.id = "time2";
    document.body.appendChild(timeElement2);

    //Create Game Start text
    gameStartElement1 = document.createElement( 'span' );
    gameStartElement1.innerHTML = 'Get Ready!';
    gameStartElement1.id = "gameStart1";
    document.body.appendChild(gameStartElement1);
    gameStartElement2 = document.createElement( 'span' );
    gameStartElement2.innerHTML = 'Press [Spacebar] to begin';
    gameStartElement2.id = "gameStart2";
    document.body.appendChild(gameStartElement2);

    //Create Game Over text
    gameOverElement = document.createElement( 'span' );
    gameOverElement.innerHTML = '';
    gameOverElement.id = "gameOver";
    document.body.appendChild(gameOverElement);

}

function animate() {

    requestAnimationFrame( animate );

    //ship angle follows lazer sights
    if(sightsMoved) {
        shipCF = new THREE.Matrix4();
        let shipRot = new THREE.Quaternion();
        const rotX = (0.65*((sights.position.y / (window.innerHeight / 2))/Math.PI) + Math.PI*1.5);
        const rotZ = 0.65*(-(sights.position.x / (window.innerWidth / 2)))/Math.PI;
        // const rotX = new THREE.Matrix4().makeRotationX((((sights.position.y / (window.innerHeight / 2))/Math.PI) + Math.PI*1.5));
        // const rotZ = new THREE.Matrix4().makeRotationZ((-(sights.position.x / (window.innerWidth / 2)))/Math.PI);
        // shipCF.multiply(rotX);
        // shipCF.multiply(rotZ);
        shipRot.setFromAxisAngle(new THREE.Vector3(1,0,0), rotX);
        let quat2 = new THREE.Quaternion();
        quat2.setFromAxisAngle(new THREE.Vector3(0,0,1), rotZ);
        shipRot.multiply(quat2);
        // shipCF.decompose(new THREE.Vector3(), shipRot, new THREE.Vector3());  // decompose the coord frame
        ship.quaternion.copy(shipRot);

        sightsMoved = false;
    }

    //lazer angle follows lazer sights (if lazer has not been shot)
    if(!lazerShot) {
        lazer.rotation.x = (0.65*((sights.position.y / (window.innerHeight / 2))) / Math.PI) + Math.PI * 1.5;
        lazer.rotation.z = 0.65*(-(sights.position.x / (window.innerWidth / 2))) / Math.PI;
    } else {
        lazer.rotation.x += 0;
        lazer.rotation.y += 0;
    }

    //checks if ship should be moving
    adjustShipPostition();

    //rotate asteroids
    rotateAsteroids();

    //if lazer has been shot, move the lazer
    if(lazerShot) {
        moveLazer(lazerXDest, lazerYDest);
    }

    //slowly rotates background
    background.rotation.y += 0.001;

    renderer.render( scene, camera );

}

function resetGame() {
    //reset variables
    movingRight = false;
    movingLeft = false;
    movingUp = false;
    movingDown = false;
    numOfAsteroids = 5;
    totalScore = 0;
    pointsForHit = 100;
    pointsForMiss = -50;
    level = 1;
    timeStart = 5;
    timeLeft = timeStart;
    timeIncrement = 3;
    lazerLocation = 0;
    lazerShot = false;
    explosionArray = [];

    //game is not active at start
    gameEnded = true;

    //reset asteroids
    for(var i = 0; i < asteroidArray.length; i ++){
        scene.remove(asteroidArray[i].object);
    }
    createNewAsteroids(numOfAsteroids);

    //Reset all text
    scoreElement.innerHTML = 'Score: '+totalScore;
    levelElement.innerHTML = 'Level '+level;
    timeElement2.innerHTML = timeLeft;
    gameStartElement1.innerHTML = 'Get Ready!';
    gameStartElement2.innerHTML = 'Press [Spacebar] to begin';
    gameOverElement.innerHTML = '';

    //clear timer
    clearInterval(timer);
}

function startTimer() {
    gameEnded = false;

    timer = setInterval(function() {
        if(!gameEnded) {
            timeLeft--;
            timeElement2.innerHTML = timeLeft;
        }
        if(timeLeft <= 0){
            gameEnded = true;
            gameOverElement.innerHTML = 'Game Over';
        }
    }, 1000);
}

function createNewAsteroids(count) {
    asteroidArray = [];
    asteroidCFArray = [];
    for(var i = 0; i < count; i++){
        //create asteroid
        let asteroid = new Asteroid();



        //randomize location (but don't overlap with another)
        let attemptCount = 0;
        while(true) {
            let xPos = Math.floor(Math.random() * ((4.1573 * window.innerWidth) - 1.5 * asteroid.values.radius) - (2.0787 * window.innerWidth) + 0.75 * asteroid.values.radius);
            let yPos = Math.floor(Math.random() * ((4.1573 * window.innerHeight) - 1.5 * asteroid.values.radius) - (2.0787 * window.innerHeight) + 0.75 * asteroid.values.radius);
            if(!checkIfOverlap(xPos, yPos, asteroid.values.radius)) {
                asteroid.object.position.x = xPos;
                asteroid.object.position.y = yPos;
                break;
            }
            //if it has taken too many attempts, there probably isn't a possible location, so just restart
            attemptCount++;
            if(attemptCount > 50){
                for(let j = 0; j < asteroidArray.length; j++){
                    scene.remove(asteroidArray[j].object);
                }
                return createNewAsteroids(count);
            }
        }
        //add asteroid to array
        asteroidArray.push(asteroid);

        //add CF and add to scene
        asteroidCFArray.push(new THREE.Matrix4());
        scene.add(asteroidArray[i].object);
    }
}

function checkIfOverlap(xPos, yPos, radius) {
    for(let i = 0; i < asteroidArray.length; i++){
        //if within X Range of asteroid
        if(xPos + radius >= asteroidArray[i].object.position.x - asteroidArray[i].values.radius &&
            xPos - radius <= asteroidArray[i].object.position.x + asteroidArray[i].values.radius){
            //if within Y Range of asteroid
            if(yPos + radius >= asteroidArray[i].object.position.y - asteroidArray[i].values.radius &&
                yPos - radius <= asteroidArray[i].object.position.y + asteroidArray[i].values.radius){
                //there is overlap
                return true;
            }
        }
    }
    //no overlap
    return false;
}

function nextLevel() {
    if(asteroidArray.length == 0){
        level++;
        levelElement.innerHTML = 'Level '+level;
        if(level % 5 == 1) {
            numOfAsteroids++;
        }
        if(timeLeft != TIME_MAX) {
            timeLeft += timeIncrement;
            if(timeLeft > TIME_MAX){
                timeLeft = TIME_MAX;
            }
        }
        timeElement2.innerHTML = timeLeft;
        createNewAsteroids(numOfAsteroids);
    }
}

function mouseOver() {
    $(document).mousemove(function(event){
        //mouse controls lazer sights
        document.body.style.cursor = 'none';
        sights.position.x = 3.55*(-window.innerWidth/2 + event.pageX);
        sights.position.y = 3.55*(window.innerHeight/2 - event.pageY);
        sightsMoved = true;
    });
}

function mouseDown(event) {
    //can't shoot if game is over
    if(!gameEnded) {
        if(lazerShot == false) {
            lazerShot = true;
            lazerXDest = event.pageX;
            lazerYDest = event.pageY;
        }
        //loop through asteroids
        for (var i = 0; i < asteroidArray.length; i++) {
            //if within X Range of asteroid
            if (event.pageX >= (window.innerWidth / 2 + 0.21 * asteroidArray[i].object.position.x) - 0.21 * asteroidArray[i].values.radius &&
                event.pageX <= (window.innerWidth / 2 + 0.21 * asteroidArray[i].object.position.x) + 0.21 * asteroidArray[i].values.radius) {
                //if within Y Range of asteroid
                if (event.pageY >= (window.innerHeight / 2 - 0.21 * asteroidArray[i].object.position.y) - 0.21 * asteroidArray[i].values.radius &&
                    event.pageY <= (window.innerHeight / 2 - 0.21 * asteroidArray[i].object.position.y) + 0.21 * asteroidArray[i].values.radius) {

                    //blow up asteroid!!!
                    makeExplosion(asteroidArray[i].values.radius, asteroidArray[i].object.position.x, asteroidArray[i].object.position.y);
                    scene.remove(asteroidArray[i].object);
                    asteroidArray.splice(i, 1);
                    asteroidCFArray.splice(i, 1);
                    totalScore += pointsForHit;
                    scoreElement.innerHTML = 'Score: ' + totalScore;

                    //if all asteroids have been cleared, go to next level
                    nextLevel();

                    return;
                }
            }
        }

        //if no asteroids were hit, you missed. Subtract points from score
        if (totalScore + pointsForMiss >= 0) {
            totalScore += pointsForMiss;
            scoreElement.innerHTML = 'Score: ' + totalScore;
        }
    }
}

function makeExplosion(radius, xPos, yPos){
    let explosion = new ExplosionPlane(radius*3, xPos, yPos);
    explosion.interval = 0;
    explosion.scaleResize = 0;
    explosion.scale.set(0,0,0);

    scene.add(explosion);
    explosionArray.push(explosion);

    var explosionInterval = setInterval(function() {
        if(explosion.interval == 15) {
            clearInterval(explosionInterval);
            scene.remove(explosion);
            explosionArray.slice(1);
        }
        if(explosion.interval < 5) {
            explosion.scaleResize += 0.2;
        } else {
            explosion.scaleResize += -0.1;
        }
        explosion.scale.set(explosion.scaleResize,explosion.scaleResize,explosion.scaleResize);
        explosion.interval++;
    }, 50);
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
        case " ":
            if(timeLeft > 0 && gameEnded) {
                gameStartElement1.innerHTML = '';
                gameStartElement2.innerHTML = '';
                gameOverElement.innerHTML = '';
                startTimer();
            } else if (timeLeft <= 0 && gameEnded){
                resetGame();
            }
            break;
    }
}

function adjustShipPostition() {
    let shipSpeed = 20;
    if(movingRight){
        if(ship.position.x <= (window.innerWidth)) {
            ship.position.x += shipSpeed;
            if(!lazerShot) {
                lazer.position.x += shipSpeed;
            }
        }
    }
    if(movingLeft){
        if(ship.position.x >= (-window.innerWidth)){
            ship.position.x += -shipSpeed;
            if(!lazerShot) {
                lazer.position.x += -shipSpeed;
            }
        }

    }
    if(movingUp){
        if(ship.position.y <= (window.innerHeight*1.25)){
            ship.position.y += shipSpeed;
            if(!lazerShot) {
                lazer.position.y += shipSpeed;
            }
        }
    }
    if(movingDown){
        if(ship.position.y >= (-window.innerHeight*1.25)){
            ship.position.y += -shipSpeed;
            if(!lazerShot) {
                lazer.position.y += -shipSpeed;
            }
        }
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

function createLazer() {
    lazer = new Lazer();
    lazer.position.x = ship.position.x;
    lazer.position.y = ship.position.y;
    lazer.position.z = -150;
    scene.add(lazer);
}

function moveLazer(xDest, yDest) {
    zDistance = 1000;
    lazer.position.x += (3.18*(-window.innerWidth/2 + xDest) - 0.45*ship.position.x)/4;
    lazer.position.y += (3.18*(window.innerHeight/2 - yDest + 70) - 0.45*500 - 0.45*ship.position.y)/4;
    lazer.position.z += -zDistance/4;

    lazerLocation++;

    //if lazer has gone its course
    if(lazerLocation == 10){
        scene.remove(lazer);
        createLazer();
        lazerShot = false;
        lazerXDest = 0;
        lazerYDest = 0;
        lazerLocation = 0;
    }
}
