import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type GLSLHillsProps = {
  className?: string;
  speed?: number;
  opacity?: number;
};

/** Lightweight local WebGL interpretation of the supplied GLSL hills prompt. */
const GLSLHills: React.FC<GLSLHillsProps> = ({ className = '', speed = 0.5, opacity = 0.62 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    camera.position.set(0, 16, 125);
    camera.lookAt(new THREE.Vector3(0, 28, 0));

    const uniforms = { time: { value: 0 }, opacity: { value: opacity } };
    const geometry = new THREE.PlaneGeometry(256, 256, 256, 256);
    const material = new THREE.RawShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        precision highp float;
        attribute vec3 position;
        uniform mat4 projectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform float time;
        varying vec3 vPosition;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
        float noise(vec3 P) {
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod289(Pi0);
          Pi1 = mod289(Pi1);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;
          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);
          vec4 gx0 = ixy0 * (1.0 / 7.0);
          vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);
          vec4 gx1 = ixy1 * (1.0 / 7.0);
          vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);
          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x), g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z), g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x), g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z), g111 = vec3(gx1.w,gy1.w,gz1.w);
          vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
          g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
          g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;
          float n000=dot(g000,Pf0), n100=dot(g100,vec3(Pf1.x,Pf0.yz));
          float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)), n110=dot(g110,vec3(Pf1.xy,Pf0.z));
          float n001=dot(g001,vec3(Pf0.xy,Pf1.z)), n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
          float n011=dot(g011,vec3(Pf0.x,Pf1.yz)), n111=dot(g111,Pf1);
          vec3 fade_xyz = fade(Pf0);
          vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
          vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
          return mix(n_yz.x,n_yz.y,fade_xyz.x) * 2.2;
        }

        void main() {
          vec3 p = position;
          p = (mat4(1.0,0.0,0.0,0.0, 0.0,0.0,-1.0,0.0, 0.0,1.0,0.0,0.0, 0.0,0.0,0.0,1.0) * vec4(p, 1.0)).xyz;
          float ridge = sin(radians(p.x / 128.0 * 90.0));
          vec3 flow = p + vec3(0.0, 0.0, time * -30.0);
          float elevation = noise(flow * 0.08) * ridge * 8.0;
          elevation += noise(flow * 0.06) * ridge * 8.0;
          elevation += noise(flow * 0.4) * (abs(ridge) * 2.0 + 0.5);
          elevation += pow(ridge, 2.0) * 40.0;
          p += vec3(0.0, elevation, 0.0);
          vPosition = p;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float opacity;
        varying vec3 vPosition;
        void main() {
          float fade = (96.0 - length(vPosition)) / 256.0 * 0.6;
          vec3 color = vec3(0.6);
          gl_FragColor = vec4(color, fade * opacity);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      uniforms.time.value += clock.getDelta() * speed;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [opacity, speed]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
};

export default GLSLHills;
