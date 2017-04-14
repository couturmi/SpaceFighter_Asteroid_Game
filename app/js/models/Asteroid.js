/**
 * Created by mitchcout on 4/13/2017.
 */
var transformation;
class Asteroid {
    constructor () {
        const asteroidGroup = new THREE.Group();

        //pick a random asteroid texture
        let asteroidType = Math.floor(Math.random() * 5 + 1);
        var asteroidTexture = new THREE.TextureLoader().load("img/asteroidTexture"+asteroidType+".jpg");
        asteroidTexture.wrapS = THREE.RepeatWrapping;
        asteroidTexture.wrapT = THREE.RepeatWrapping;

        //pick a random asteroid size
        let asteroidSize = Math.floor(Math.random() * 200 + 125);

        //pick random rotations and translations
        transformation = {
            radius : asteroidSize,
            xRot : Math.random() * (Math.PI/200) - (Math.PI/400),
            yRot : Math.random() * (Math.PI/200) - (Math.PI/400)
        }

        //create object mesh
        var asteroidGeo = new THREE.SphereGeometry(asteroidSize,20,20);
        var asteroidMat = new THREE.MeshPhongMaterial();
        asteroidMat.map = asteroidTexture;

        var asteroid = new THREE.Mesh(asteroidGeo,asteroidMat);
        asteroid.material.side = THREE.DoubleSide;
        asteroidGroup.add(asteroid);

        asteroidGroup.position.z = -1000;

        return {object: asteroidGroup, values: transformation};
    }
}
