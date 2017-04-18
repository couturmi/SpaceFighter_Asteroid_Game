/**
 * Created by mitchcout on 4/17/2017.
 */
var explosionAnimation, explosionTexture, clock;
class ExplosionPlane {
    constructor (radius, xPos, yPos) {
        clock = new THREE.Clock();
        const explosionGroup = new THREE.Group();

        const explosionGeo = new THREE.PlaneGeometry(radius, radius);
        explosionTexture = new THREE.TextureLoader().load("img/explosion_img.png");
        const explosionMat = new THREE.MeshBasicMaterial({transparent: true});
        explosionMat.map = explosionTexture;
        const explosion = new THREE.Mesh(explosionGeo, explosionMat);
        explosionGroup.add(explosion);

        explosionGroup.position.x = xPos;
        explosionGroup.position.y = yPos;
        explosionGroup.position.z = -1000;

        return explosionGroup;
    }
}
