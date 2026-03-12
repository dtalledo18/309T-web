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

// Sub-componente para cargar el modelo GLB
function HVACModel() {
    // 1. Cargamos el modelo
    const { scene, animations } = useGLTF('/models/HVAC-animated-3.glb');

    // 2. Extraemos las animaciones y las vinculamos a la escena
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        // 3. Reproducimos la primera animación disponible
        // Si conoces el nombre de la animación (ej: "Scene"), usa actions["Scene"]?.play();
        const firstAction = Object.values(actions)[0];

        if (firstAction) {
            firstAction.reset().fadeIn(0.5).play();
        }

        // Limpieza al desmontar
        return () => {
            firstAction?.fadeOut(0.5);
        };
    }, [actions]);

    return (
        <primitive
            object={scene}
            scale={1.5}
            position={[0.35, 1, 0]}
            castShadow
            receiveShadow
        />
    );
}

export default function Hero3D() {
    const scrollToAbout = () => {
        // Buscamos el elemento por ID
        const aboutSection = document.getElementById('about-text');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                    <button onClick={scrollToAbout} className="mt-10 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                        Explore 309T
                    </button>
                </div>
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
useGLTF.preload('/models/HVAC-animated-3.glb');