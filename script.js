const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (header && window.scrollY > 30 && !header.classList.contains('solid')) header.classList.add('scrolled');
window.addEventListener('scroll', () => { if (header && !header.classList.contains('solid')) header.classList.toggle('scrolled', window.scrollY > 30); }, { passive: true });

if (menuToggle && nav) menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
  lucide.createIcons();
});

document.querySelectorAll('.main-nav a').forEach(link => {
  const current = link.getAttribute('href') === location.pathname.split('/').pop() || (link.getAttribute('href') === 'index.html' && !location.pathname.split('/').pop());
  link.classList.toggle('active', current);
  link.addEventListener('click', () => { nav?.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); });
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const galleryItems = [...document.querySelectorAll('.gallery-item')];
document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(button => button.classList.remove('active'));
  filter.classList.add('active');
  galleryItems.forEach(item => item.classList.toggle('is-hidden', filter.dataset.filter !== 'all' && item.dataset.category !== filter.dataset.filter));
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
let lightboxItems = [];
let lightboxIndex = 0;
const showLightboxImage = index => { if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxItems.length) return; lightboxIndex = (index + lightboxItems.length) % lightboxItems.length; const item = lightboxItems[lightboxIndex]; lightboxImage.src = item.src || item.dataset.src; lightboxImage.alt = item.alt || item.dataset.title; lightboxCaption.textContent = item.caption || item.dataset.title || ''; };
const openLightbox = (items, index) => { if (!lightbox) return; lightboxItems = items; showLightboxImage(index); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };

galleryItems.forEach(item => item.addEventListener('click', () => openLightbox(galleryItems.filter(image => !image.classList.contains('is-hidden')).map(image => ({ src:image.dataset.src, alt:image.dataset.title, dataset:image.dataset, caption:image.dataset.title })), galleryItems.filter(image => !image.classList.contains('is-hidden')).indexOf(item))));
document.querySelectorAll('.certificate-card').forEach(card => {
  card.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
  card.addEventListener('click', () => openLightbox(card.dataset.certImages.split('|').map((src, index) => ({ src, alt:`${card.dataset.certTitle} page ${index + 1}`, caption:`${card.dataset.certTitle} · ${index + 1} / ${card.dataset.certImages.split('|').length}` })), 0));
});
document.querySelectorAll('.preview-grid img').forEach(image => { image.loading = 'eager'; });
document.querySelectorAll('main img').forEach(image => { image.loading = 'eager'; });
if (lightbox) { lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox); lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => showLightboxImage(lightboxIndex - 1)); lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => showLightboxImage(lightboxIndex + 1)); lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); }); }
document.addEventListener('keydown', event => { if (!lightbox?.classList.contains('open')) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1); if (event.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1); });

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => { event.preventDefault(); const status = form.querySelector('.form-status'); status.textContent = 'Thank you. Your enquiry is ready to be reviewed by our team.'; form.reset(); });

if (!document.querySelector('.site-footer')) document.body.insertAdjacentHTML('beforeend', '<footer class="site-footer"><div class="shell footer-grid"><div><a class="brand" href="index.html"><img src="Asset/matrix-mega-force-logo-transparent.png" alt="Matrix Mega Force logo"><span>MATRIX <strong>MEGA FORCE</strong><small>SDN BHD</small></span></a><p>Professional Security.<br><em>Reliable Protection.</em></p></div><div><h3>Quick Links</h3><a href="about.html">About Us</a><a href="services.html">Our Services</a><a href="training.html">Training</a><a href="gallery.html">Gallery</a><a href="clients.html">Clients & Partners</a><a href="contact.html">Contact Us</a></div><div><h3>Contact</h3><a href="tel:077525700"><i data-lucide="phone"></i>07-752 5700 / 5031</a><a href="mailto:matrixmegaforce11@gmail.com"><i data-lucide="mail"></i>matrixmegaforce11@gmail.com</a><a href="https://wa.me/60182229130"><i data-lucide="message-circle"></i>WhatsApp: 018 222 9130</a></div></div><div class="shell footer-bottom">© 2026 MATRIX MEGA FORCE SDN BHD. All Rights Reserved.</div></footer>');

lucide.createIcons();
