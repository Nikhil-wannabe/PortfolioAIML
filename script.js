// Horizontal scrolling
const container = document.getElementById('scroll-container');
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        container.scrollLeft += window.innerWidth;
    } else if (e.key === 'ArrowLeft') {
        container.scrollLeft -= window.innerWidth;
    }
});

// Parallax layers
function updateParallax() {
    const scrollLeft = container.scrollLeft;
    document.querySelectorAll('[data-speed]').forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        el.style.transform = `translateX(${ -scrollLeft * speed }px)`;
    });
}
container.addEventListener('scroll', updateParallax);
window.addEventListener('resize', updateParallax);

// Three.js hero object
function initThree() {
    const canvas = document.getElementById('hero-canvas');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 3;

    const geometry = new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16);
    const material = new THREE.MeshStandardMaterial({color: 0x8FBC8F, metalness: 0.3, roughness: 0.2});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2,2,3);
    scene.add(light);

    // Interaction: rotate with pointer
    let isDragging = false;
    let lastX = 0;
    canvas.addEventListener('pointerdown', (e) => {
        isDragging = true;
        lastX = e.clientX;
    });
    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const delta = e.clientX - lastX;
            mesh.rotation.y += delta * 0.005;
            lastX = e.clientX;
        }
    });

    // Color control
    const colorInput = document.getElementById('mesh-color');
    colorInput.addEventListener('input', () => {
        material.color.set(colorInput.value);
    });

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    animate();
}


initThree();

// Fade-in panels
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.panel').forEach(p => observer.observe(p));

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.checkValidity()) {
        status.textContent = 'Message sent!';
        status.style.color = '#7CFC00';
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 2000);
        form.reset();
    } else {
        status.textContent = 'Please fill out all fields.';
        status.style.color = '#FF6347';
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 2000);
    }
});
