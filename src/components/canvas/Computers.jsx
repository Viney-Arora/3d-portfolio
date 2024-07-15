// import { extend } from '@react-three/fiber'
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';
// extend({ OrbitControls, Preload, useGLTF })


const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.7}
        groudColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-10, 18, -8]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile? [0,-3, -2.2 ] :[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}

      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a Listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width : 500px)');
    setIsMobile(mediaQuery.matches)

    // set the initial value of the isMobile state variable
    const handlemMediaQueryChange= (event) => {
      setIsMobile(event.matches);
    }
    // Define a callback function to handle changes to the media query
    mediaQuery.addEventListener('change', handlemMediaQueryChange);

    // Add the callback function as a listener for changes to the media query
    return () =>  {
      mediaQuery.removeEventListener('change', handlemMediaQueryChange);
    }
    
  },[])
  return (
    <>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preseveDrawingBuffer: true }}
      >

        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />

      </Canvas>
    </>
  )
}

export default ComputersCanvas;
// export default Computer