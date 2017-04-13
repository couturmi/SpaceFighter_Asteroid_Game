/**
 * Created by mitchcout on 4/12/2017.
 */
class LazerSights {
    constructor () {
        const lazerSightsGroup = new THREE.Group();

        var sightRingGeo = new THREE.RingGeometry( 60, 70, 32 );
        var sightRingMat = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var sightRing = new THREE.Mesh( sightRingGeo, sightRingMat );
        lazerSightsGroup.add( sightRing );
        var sightDotGeo = new THREE.CircleGeometry( 7, 32 );
        var sightDotMat = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
        var sightDot = new THREE.Mesh( sightDotGeo, sightDotMat );
        lazerSightsGroup.add( sightDot );

        //move sights behind ship
        lazerSightsGroup.position.z += -200;

        return lazerSightsGroup;
    }
}
