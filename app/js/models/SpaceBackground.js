/**
 * Created by mitchcout on 4/12/2017.
 */
class SpaceBackground {
    constructor () {
        const spaceBGGroup = new THREE.Group();

        var spaceTexture = new THREE.TextureLoader().load("img/spaceBackground.jpg");
        spaceTexture.repeat.set(5,3);
        spaceTexture.wrapS = THREE.RepeatWrapping;
        spaceTexture.wrapT = THREE.RepeatWrapping;

        var spacesphereGeo = new THREE.SphereGeometry(6000,20,20);
        var spacesphereMat = new THREE.MeshBasicMaterial();
        spacesphereMat.map = spaceTexture;

        var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);
        spacesphere.material.side = THREE.DoubleSide;
        spaceBGGroup.add(spacesphere);

        return spaceBGGroup;
    }
}
