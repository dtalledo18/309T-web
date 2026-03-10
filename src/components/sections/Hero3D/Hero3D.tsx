'use client';
import { Suspense } from 'react';
import { useEffect } from 'react';
import {
    OrbitControls,
    Stage,
    PerspectiveCamera,
    ContactShadows,
    useGLTF,
    useAnimations
} from '@react-three/drei';
import styles from './Hero3D.module.css';
import {Canvas} from "@react-three/fiber";

function HVACModel() {
    const { scene, animations } = useGLTF('/models/HVAC-animated.glb');
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        const firstAction = Object.values(actions)[0];
        if (firstAction) {
            firstAction.reset().fadeIn(0.5).play();
        }
        return () => {
            firstAction?.fadeOut(0.5);
        };
    }, [actions]);

    return (
        <primitive
            object={scene}
            scale={1.3}
            position={[0, 4.5, 0]}
            castShadow
            receiveShadow
        />
    );
}

export default function Hero3D() {
    return (
        <section className={styles.hero}>
            <div className={styles.textContent}>
                <div>
                    <h1 className={styles.title}>
                        From Weeks <span className="italic font-light">to Minutes</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Reduce HVAC reporting time and empower your team with the industry's fastest digital workflow.
                    </p>
                </div>
                <div>
                    <button className="mt-10 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                        Explore 309T
                    </button>
                </div>
            </div>

            <div className="absolute inset-0 w-full h-full z-[2]">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 1.9, 5.2]} fov={38} />

                    <fog attach="fog" args={['#131825', 8, 20]} />

                    <Suspense fallback={null}>
                        <Stage
                            environment="city"
                            intensity={0.5}
                            shadows={{ type: 'contact', opacity: 0.6, blur: 2 }}
                            adjustCamera={false}
                        >
                            <HVACModel />
                        </Stage>
                    </Suspense>

                    <ContactShadows
                        position={[0, -1.4, 0]}
                        opacity={0.6}
                        scale={10}
                        blur={2.5}
                        far={4}
                    />

                    <OrbitControls
                        target={[0, 1.1, 0]}
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.7}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.3}
                        maxPolarAngle={Math.PI / 2.05}
                    />
                </Canvas>
            </div>
        </section>
    );
}

useGLTF.preload('/models/HVAC-animated.glb');