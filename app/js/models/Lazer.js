/**
 * Created by mitchcout on 4/17/2017.
 */
class Lazer {
    constructor () {
        const lazerGroup = new THREE.Group();

        const lazerGeo = new THREE.CylinderGeometry(10, 10, 100, 20, 1);
        const lazerMat = new THREE.MeshBasicMaterial({color: 0xc90000});
        const lazer = new THREE.Mesh(lazerGeo, lazerMat);
        lazerGroup.add(lazer);

        lazerGroup.rotation.x += Math.PI/2;

        return lazerGroup;
    }
}
