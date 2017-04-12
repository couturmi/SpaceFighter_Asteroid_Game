/**
 * Created by mitchcout on 4/11/2017.
 */
class SpaceFighter {
    constructor () {
        const spaceFighterGroup = new THREE.Group();

        /* declare parts */
        //body
        const bodyGeo = new THREE.CylinderGeometry(100, 100, 250, 6, 1);
        const bodyMat = new THREE.MeshPhongMaterial({color: 0xc5c8cc});
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        spaceFighterGroup.add(body);
        //wings
        var wingShape = new THREE.Shape();
        wingShape.moveTo( 0,0 );
        wingShape.lineTo( 0, 85 );
        wingShape.lineTo( 350, 50 );
        wingShape.lineTo( 350, -50 );
        wingShape.lineTo( 0, -85 );
        wingShape.lineTo( 0, 0 );
        var wingExtrudeSettings = {
            steps: 2,
            amount: 5,
            bevelEnabled: true,
            bevelThickness: 3,
            bevelSize: 10,
            bevelSegments: 1
        };
        var wingArray = [];
        for(let i = 0; i < 4; i++){
            const wingGeo = new THREE.ExtrudeGeometry(wingShape, wingExtrudeSettings);
            const wingMat = new THREE.MeshPhongMaterial({color: 0xc5c8cc});
            const wing = new THREE.Mesh(wingGeo, wingMat);
            wingArray.push(wing);
            spaceFighterGroup.add(wingArray[i]);
        }
        //engines
        var engineArray = [];
        for(let i = 0; i < 4; i++){
            const engineGeo = new THREE.CylinderGeometry(30, 30, 150, 30, 1, false);
            const engineMat = new THREE.MeshPhongMaterial({color: 0xc3c6c9});
            const engine = new THREE.Mesh(engineGeo, engineMat);
            engineArray.push(engine);
            spaceFighterGroup.add(engineArray[i]);
        }
        var engine2Array = [];
        for(let i = 0; i < 4; i++){
            const engineGeo = new THREE.CylinderGeometry(45, 45, 100, 30, 1, false);
            const engineMat = new THREE.MeshPhongMaterial({color: 0x434547});
            const engine = new THREE.Mesh(engineGeo, engineMat);
            engine2Array.push(engine);
            spaceFighterGroup.add(engine2Array[i]);
        }
        //engine fire
        var fireArray = [];
        for(let i = 0; i < 4; i++){
            const fireGeo = new THREE.CylinderGeometry(30, 30, 150, 30, 1, false);
            const fireMat = new THREE.MeshPhongMaterial({color: 0xc3c6c9});
            const fire = new THREE.Mesh(fireGeo, fireMat);
            fireArray.push(fire);
            spaceFighterGroup.add(fireArray[i]);
        }



        /* rotations/translations/scaling */
        body.rotation.y += Math.PI/2;

        wingArray[0].rotation.z += Math.PI;
        wingArray[0].rotation.y += -Math.PI/8;
        wingArray[0].position.x += -90;
        wingArray[0].position.z += -25;

        wingArray[1].rotation.y += Math.PI/8;
        wingArray[1].position.x += 90;
        wingArray[1].position.z += -25;

        wingArray[2].rotation.z += Math.PI;
        wingArray[2].rotation.y += Math.PI/8;
        wingArray[2].position.x += -90;
        wingArray[2].position.z += 25;

        wingArray[3].rotation.y += -Math.PI/8;
        wingArray[3].position.x += 90;
        wingArray[3].position.z += 25;

        engineArray[0].position.x += -110;
        engineArray[0].position.z += -80;
        engineArray[0].position.y += -80;

        engineArray[1].position.x += 110;
        engineArray[1].position.z += 80;
        engineArray[1].position.y += -80;

        engineArray[2].position.x += 110;
        engineArray[2].position.z += -80;
        engineArray[2].position.y += -80;

        engineArray[3].position.x += -110;
        engineArray[3].position.z += 80;
        engineArray[3].position.y += -80;

        engine2Array[0].position.x += -110;
        engine2Array[0].position.z += -80;
        engine2Array[0].position.y += 40;

        engine2Array[1].position.x += 110;
        engine2Array[1].position.z += 80;
        engine2Array[1].position.y += 40;

        engine2Array[2].position.x += 110;
        engine2Array[2].position.z += -80;
        engine2Array[2].position.y += 40;

        engine2Array[3].position.x += -110;
        engine2Array[3].position.z += 80;
        engine2Array[3].position.y += 40;


        //spaceFighterGroup.rotation.x += Math.PI/2;
        return spaceFighterGroup;

    }
}
