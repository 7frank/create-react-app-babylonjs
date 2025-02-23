import React, { useRef, useCallback } from 'react'
import "@babylonjs/core/Physics/physicsEngineComponent"  
import { Engine, Scene } from 'react-babylonjs'
import { Vector3, PhysicsImpostor } from '@babylonjs/core';
import {Control} from '@babylonjs/gui';

import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins'


import * as CANNON from 'cannon';
window.CANNON = CANNON;

// The TypeScript version of this story has it's own repo
const gravityVector = new Vector3(0, -9.81, 0);

function WithGUI() {

  const sphere1Ref = useRef(null);
  const label1Ref = useRef(null);
  const sphere2Ref = useRef(null);
  const label2Ref = useRef(null);
  const sphere3Ref = useRef(null);
  const label3Ref = useRef(null);
  const sphere4Ref = useRef(null);
  const label4Ref = useRef(null);
  const sphere5Ref = useRef(null);
  const label5Ref = useRef(null);
  const sphere6Ref = useRef(null);
  const label6Ref = useRef(null);
  const sphere7Ref = useRef(null);
  const lineRef = useRef(null);
  const label7Ref = useRef(null);

  const refLookup = {
    '1': {
      sphere: sphere1Ref,
      label: label1Ref
    },
    '2': {
      sphere: sphere2Ref,
      label: label2Ref
    },
    '3': {
      sphere: sphere3Ref,
      label: label3Ref
    },
    '4': {
      sphere: sphere4Ref,
      label: label4Ref
    },
    '5': {
      sphere: sphere5Ref,
      label: label5Ref
    },
    '6': { 
      sphere: sphere6Ref,
      label: label6Ref
    },
    '7': {
      sphere: sphere7Ref,
      label: label7Ref
    }
  }

  const onFullScreenRef = useCallback(ref => {
      const line = lineRef.current
      
      try {
        line.linkWithMesh(sphere7Ref.current);
        line.connectedControl = label7Ref.current;

        
        [1,2,3,4,5,6].forEach((i) => {
          const lookup = refLookup[i.toString()];
          lookup.label.current.linkWithMesh(lookup.sphere.current)
        })
      } catch (e) {
        console.error(e)
      }
  });

  return (
    <>
        <sphere name='Sphere1' ref={sphere1Ref} segments={10} diameter={9} position={new Vector3(-30, 5, 0)}  checkCollisions={true} />
        <sphere name='Sphere2' ref={sphere2Ref} segments={2} diameter={9} position={new Vector3(-20, 50, 0)} checkCollisions={true} />
        <sphere name='Sphere3' ref={sphere3Ref} segments={10} diameter={9} position={new Vector3(-10, 10, 0)} checkCollisions={true}  applyGravity={true} showSubMeshesBoundingBox={true} >
        <physicsImpostor type={PhysicsImpostor.SphereImpostor} _options={{
                    mass: 1,
                    restitution: 0.9
                }} />
        </sphere>
        <sphere name='Sphere4' ref={sphere4Ref} segments={10} diameter={9} position={new Vector3(0, 10, 0)} checkCollisions={true} />
        <sphere name='Sphere5' ref={sphere5Ref} segments={10} diameter={9} position={new Vector3(10, 10, 0)} checkCollisions={true} />
        <sphere name='Sphere6' ref={sphere6Ref} segments={10} diameter={9} position={new Vector3(20, 10, 0)} checkCollisions={true} />
        <sphere name='Sphere7' ref={sphere7Ref} segments={10} diameter={9} position={new Vector3(30, 10, 0)} checkCollisions={true} />

        <adtFullscreenUi name='ui1' ref={onFullScreenRef}>

          {[1,2,3,4,5,6,7].map((i) =>
            <rectangle key={`label${i}`} name={`label for Sphere${i}`} background='black' height='30px' alpha={0.5}
                      width='100px' cornerRadius={20} thickness={1}
                      linkOffsetY={30} ref={refLookup[i.toString()].label}
                      verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                      top={i === 7 ? '10%' : 0}
            >
              <textBlock name={`sphere-${i}-text`} text={`Sphere${i}`} color='White'/>
            </rectangle>
          )

          }
          <babylon-line name="sphere-7-line" alpha={0.5} lineWidth={5} dash={[5, 10]} ref={lineRef} />

        </adtFullscreenUi>
      </>
  )
}


const FrankPlayground = () => (  
  <div className="row">
    <div className="col-md-12">
      <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas" antialias adaptToDeviceRatio>
        <Scene collisionsEnabled={true}  enablePhysics={[gravityVector, new CannonJSPlugin()]} >
          <freeCamera name="camera1" position={new Vector3(0, 165, -10)} setTarget={[Vector3.Zero()]} checkCollisions={true} applyGravity={true} ellipsoid={new Vector3(2, 2, 2)} />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} /> 
           <ground name="ground1" width={600} height={600} subdivisions={2} checkCollisions={true} />
          <WithGUI></WithGUI>
        </Scene>
      </Engine>
    </div>
  </div>
)

export default FrankPlayground