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
        const bodyMidGeo = new THREE.CylinderGeometry(35, 100, 450, 6, 1);
        const bodyMidMat = new THREE.MeshPhongMaterial({color: 0xc5c8cc});
        const bodyMid = new THREE.Mesh(bodyMidGeo, bodyMidMat);
        spaceFighterGroup.add(bodyMid);
        var bodyBackGeo = new THREE.SphereGeometry(100.25, 6, 25);
        var bodyBackMat = new THREE.MeshPhongMaterial( {color: 0xc5c8cc} );
        var bodyBack = new THREE.Mesh( bodyBackGeo, bodyBackMat );
        spaceFighterGroup.add( bodyBack );
        var bodyTipGeo = new THREE.SphereGeometry(35.25, 6, 25, Math.PI/2);
        var bodyTipMat = new THREE.MeshPhongMaterial( {color: 0xc5c8cc} );
        var bodyTip = new THREE.Mesh( bodyTipGeo, bodyTipMat );
        spaceFighterGroup.add( bodyTip );
        //cockpit
        var cockpitShape = new THREE.Shape();
        cockpitShape.moveTo( 0,0 );
        cockpitShape.lineTo( 0, 35 );
        cockpitShape.lineTo( 30, 20 );
        cockpitShape.lineTo( 30, -20 );
        cockpitShape.lineTo( 0, -35 );
        cockpitShape.lineTo( 0, 0 );
        var cockpitExtrudeSettings = {
            steps: 2,
            amount: 150,
            bevelEnabled: true,
            bevelThickness: 30,
            bevelSize: 30,
            bevelSegments: 1
        };
        var cockpitGeo = new THREE.ExtrudeGeometry( cockpitShape, cockpitExtrudeSettings );
            // var cockpitMat = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
        var cockpitMat = new THREE.MeshPhongMaterial( { color: 0x1c7c1e } );
        var cockpit = new THREE.Mesh( cockpitGeo, cockpitMat ) ;
        spaceFighterGroup.add( cockpit );
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
        //wing poles
        var wingPoleArray = [];
        for(let i = 0; i < 4; i++){
            const wingPoleGeo = new THREE.CylinderGeometry(5, 5, 400, 30, 1, false);
            const wingPoleMat = new THREE.MeshPhongMaterial({color: 0xc5c8cc});
            const wingPole = new THREE.Mesh(wingPoleGeo, wingPoleMat);
            wingPoleArray.push(wingPole);
            spaceFighterGroup.add(wingPoleArray[i]);
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
            const fireGeo = new THREE.RingGeometry(10, 28, 30, 1, 0, Math.PI*2);
            const fireMat = new THREE.MeshBasicMaterial({color: 0x9e2525});
            const fire = new THREE.Mesh(fireGeo, fireMat);
            fireArray.push(fire);
            spaceFighterGroup.add(fireArray[i]);
        }



        /* rotations/translations/scaling */
        body.rotation.y += Math.PI/2;

        bodyMid.rotation.y += Math.PI/2;
        bodyMid.position.y += 350;

        bodyBack.position.y += -125;

        bodyTip.rotation.y += Math.PI/2;
        // bodyTip.position.y += 610;
        bodyTip.position.y +=573;

        cockpit.rotation.z += Math.PI/2;
        cockpit.rotation.x += Math.PI/2-Math.PI/8;
        cockpit.position.z = 15;
        cockpit.position.y = 270;

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

        wingPoleArray[0].position.x += -425;
        wingPoleArray[0].position.z += 165;
        wingPoleArray[0].position.y += 140;

        wingPoleArray[1].position.x += -425;
        wingPoleArray[1].position.z += -165;
        wingPoleArray[1].position.y += 140;

        wingPoleArray[2].position.x += 425;
        wingPoleArray[2].position.z += -165;
        wingPoleArray[2].position.y += 140;

        wingPoleArray[3].position.x += 425;
        wingPoleArray[3].position.z += 165;
        wingPoleArray[3].position.y += 140;

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

        fireArray[0].rotation.x += Math.PI/2;
        fireArray[0].position.x += -110;
        fireArray[0].position.z += 80;
        fireArray[0].position.y += -156;

        fireArray[1].rotation.x += Math.PI/2;
        fireArray[1].position.x += 110;
        fireArray[1].position.z += 80;
        fireArray[1].position.y += -156;

        fireArray[2].rotation.x += Math.PI/2;
        fireArray[2].position.x += -110;
        fireArray[2].position.z += -80;
        fireArray[2].position.y += -156;

        fireArray[3].rotation.x += Math.PI/2;
        fireArray[3].position.x += 110;
        fireArray[3].position.z += -80;
        fireArray[3].position.y += -156;


        spaceFighterGroup.rotation.x += Math.PI*1.5;
        spaceFighterGroup.position.y += -500;
        return spaceFighterGroup;

    }
}
