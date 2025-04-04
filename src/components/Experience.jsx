import { Box, OrbitControls, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Controls } from "../constans/Const";
import { useFrame } from "@react-three/fiber";

const Experience = () => {
  const cube = useRef(null);
  const isOnFloor = useRef(true);
  const [hover, setHover] = useState(false);

  useFrame(() => {
    if (jumpPressed) {
      jump();
    }
    handleMovement();
  });

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const jump = () => {
    if (isOnFloor.current) {
      cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
      isOnFloor.current = false;
    }
  };

  const handleMovement = () => {
    if (!isOnFloor.current) return;
    if (rightPressed) {
      cube.current.applyImpulse({ x: 0.1, y: 0, z: 0 });
    }
    if (leftPressed) {
      cube.current.applyImpulse({ x: -0.1, y: 0, z: 0 });
    }

    if (forwardPressed) {
      cube.current.applyImpulse({ x: 0, y: 0, z: -0.1 });
    }
    if (backPressed) {
      cube.current.applyImpulse({ x: 0, y: 0, z: 0.1 });
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 6]} intensity={0.4} />
      {/* <OrbitControls /> */}

      <RigidBody
        ref={cube}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = false;
          }
        }}
      >
        <Box
          position={[0, 5, 0]}
          args={[1, 1, 1]}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <meshStandardMaterial color={hover ? "orange" : "lightgray"} />
        </Box>
      </RigidBody>

      <RigidBody type="fixed" name="floor">
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};

export default Experience;
