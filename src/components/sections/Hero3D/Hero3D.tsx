'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls,
    Stage,
    PerspectiveCamera,
    ContactShadows,
    useGLTF
} from '@react-three/drei';
import styles from './Hero3D.module.css';

// Sub-componente para cargar el modelo GLB
function HVACModel() {
    // Carga el archivo desde public/models/hvac.glb
    const { scene } = useGLTF('/models/hvac.glb');

    return (
        <primitive
            object={scene}
            scale={1.5}
            position={[0, -0.5, 0]}
            castShadow
            receiveShadow
        />
    );
}

export default function Hero3D() {
    return (
        <section className={styles.hero}>
            <div className={styles.textContent}>
                <h1 className={styles.title}>
                    From Weeks <span className="italic font-light opacity-50">to</span> Minutes
                </h1>
                <p className={styles.subtitle}>
                    Reduce HVAC reporting time and empower your team with the industry's fastest digital workflow.
                </p>
                <button className="mt-10 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                    Explore 309T
                </button>
            </div>

            <div className="absolute inset-0 w-full h-full z-0">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                    {/* Suspense maneja la carga asíncrona del modelo */}
                    <Suspense fallback={null}>
                        <Stage
                            environment="city"
                            intensity={0.5}
                            shadows={{ type: 'contact', opacity: 0.6, blur: 2 }} // Configuración como objeto
                            adjustCamera={false}
                        >
                            <HVACModel />
                        </Stage>
                    </Suspense>

                    <ContactShadows
                        position={[0, -1.2, 0]}
                        opacity={0.6}
                        scale={10}
                        blur={2.5}
                        far={4}
                    />

                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.5}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </div>
        </section>
    );
}

// Pre-carga el modelo para evitar tirones visuales
useGLTF.preload('/models/hvac.glb');