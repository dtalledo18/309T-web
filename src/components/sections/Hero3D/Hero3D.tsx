'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import styles from './Hero3D.module.css';

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
                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

                    {/* Stage ahora solo maneja la iluminación y el centrado */}
                    <Stage environment="city" intensity={0.6} adjustCamera={false}>
                        <mesh castShadow receiveShadow>
                            <boxGeometry args={[1, 1.5, 1]} />
                            <meshStandardMaterial
                                color="#475569"
                                metalness={0.8}
                                roughness={0.2}
                            />
                        </mesh>
                    </Stage>

                    {/* Componente independiente para las sombras, fuera del Stage */}
                    <ContactShadows
                        position={[0, -0.75, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2}
                        far={4}
                    />

                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        enablePan={false}
                    />
                </Canvas>
            </div>
        </section>
    );
}