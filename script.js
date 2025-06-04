// Horizontal scrolling
const container = document.getElementById('scroll-container');
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
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
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    animate();
}

initThree();

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.checkValidity()) {
        status.textContent = 'Message sent!';
        status.style.color = '#7CFC00';
        form.reset();
    } else {
        status.textContent = 'Please fill out all fields.';
        status.style.color = '#FF6347';
    }
});
