/* ============================================
   RENAISSANCE - SCRIPT.JS
   Premium Educational Coaching Brand
   Author: Senior Creative Developer
   ============================================ */

// ========== GSAP INITIALIZATION ==========
gsap.registerPlugin(ScrollTrigger);

// ========== THREE.JS SCENE SETUP ==========
let scene, camera, renderer, mesh;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    // Scene Setup
    scene = new THREE.Scene();
    
    // Camera Setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer Setup
    const canvas = document.getElementById('threeCanvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create Fluid Mesh Geometry
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    
    // Material with Tan-Gold Gradient
    const material = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        wireframe: false,
        roughness: 0.4,
        metalness: 0.6,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.2
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Lighting
    const pointLight1 = new THREE.PointLight(0xD4AF37, 1.5, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xD2B48C, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    const ambientLight = new THREE.AmbientLight(0xF5F1E6, 0.3);
    scene.add(ambientLight);
    
    // Start Animation Loop
    animate();
}

// Three.js Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth Mouse Following
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    // Rotation Animation
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;
    
    // Mouse Interaction
    mesh.position.x += (targetX - mesh.position.x) * 0.05;
    mesh.position.y += (-targetY - mesh.position.y) * 0.05;
    
    // Render Scene
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Track Mouse Movement for Three.js
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
});

// Initialize Three.js on Load
initThreeJS();

// ========== TYPEWRITER EFFECT ==========
const brandNameElement = document.getElementById('brandName');
const brandText = "Renaissance";
let charIndex = 0;

function typeWriter() {
    if (charIndex < brandText.length) {
        brandNameElement.textContent += brandText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    }
}

// Start Typewriter Effect
setTimeout(typeWriter, 500);

// ========== CUSTOM MAGNETIC CURSOR ==========
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

// Update Cursor Position
document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Expand Cursor on Interactive Elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .tilt-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('expand');
        cursorOutline.classList.add('expand');
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('expand');
        cursorOutline.classList.remove('expand');
    });
});

// ========== HAMBURGER MENU FUNCTIONALITY ==========
const hamburgerBtn = document.getElementById('hamburgerBtn');
const fullscreenNav = document.getElementById('fullscreenNav');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const navLinks = document.querySelectorAll('.nav-link');

// Open Menu
hamburgerBtn.addEventListener('click', () => {
    fullscreenNav.classList.add('active');
});

// Close Menu
closeMenuBtn.addEventListener('click', () => {
    fullscreenNav.classList.remove('active');
});

// Close Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        fullscreenNav.classList.remove('active');
    });
});

// ========== GSAP SCROLL REVEAL ANIMATIONS ==========
gsap.utils.toArray('.reveal-element').forEach(element => {
    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

// Philosophy Text Animations
gsap.utils.toArray('.philosophy-text').forEach((text, index) => {
    gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
});

// Instagram Description Animation
const instagramDesc = document.querySelector('.instagram-description');
if (instagramDesc) {
    gsap.to(instagramDesc, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: instagramDesc,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

// ========== 3D TILT EFFECT ON TESTIMONIAL CARDS ==========
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ========== ENROLLMENT FORM SUBMISSION ==========
const enrollmentForm = document.getElementById('enrollmentForm');
const successModal = document.getElementById('successModal');

enrollmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect Form Data
    const formData = {
        parentName: document.getElementById('parentName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        goals: document.getElementById('goals').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send Data to N8N Webhook
        const response = await fetch('https://izzankhan.app.n8n.cloud/webhook/adsprint-leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Show Success Modal
            successModal.classList.add('show');
            
            // Reset Form
            enrollmentForm.reset();
            
            // Redirect to WhatsApp after 3 seconds
            setTimeout(() => {
                window.location.href = 'https://wa.me/919421248607?text=Hi%20Izzan!%20I%20want%20to%20discuss%20a%20Renaissance%20transformation%20for%20my%20child.';
            }, 3000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again or contact us directly via WhatsApp.');
    }
});

// ========== SMOOTH SCROLL ENHANCEMENT ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== CONSOLE SIGNATURE ==========
console.log('%c Renaissance %c Crafted with Excellence ', 
    'background: #2A1B12; color: #D4AF37; font-size: 20px; padding: 10px;',
    'background: #D2B48C; color: #2A1B12; font-size: 20px; padding: 10px;'
);
