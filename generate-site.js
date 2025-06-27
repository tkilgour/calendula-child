// Site Generator for Calendula Child
// Run with: node generate-site.js

const fs = require("fs");
const path = require("path");

// Product data - edit this section to update your products
const products = [
  {
    id: 1,
    name: "Quilted Celebration Crown",
    description:
      "Handmade crown in soft cotton with quilted details. Features adjustable snaps for a perfect fit.",
    category: "Clothing",
    price: 35,
    images: [
      "/images/crown-1.jpeg",
      "/images/crown-2.jpeg",
      "/images/crown-3.jpeg",
    ],
  },
  {
    id: 2,
    name: "Grow-with-me Pants",
    description:
      "Organic cotton pants with adjustable cuffs. Designed to grow with your child, featuring a comfortable elastic waistband.",
    category: "Clothing",
    price: 30,
    images: ["/images/pants-1.jpeg", "/images/pants-2.jpeg"],
  },
  {
    id: 3,
    name: "Inner Child Dolls",
    description:
      "Handmade dolls crafted from natural fibers. Each doll is unique, with hand-stitched details and soft, safe materials.",
    category: "Toys",
    price: 65,
    images: [
      "/images/doll-1.jpeg",
      "/images/doll-2.jpeg",
      "/images/doll-3.jpeg",
      "/images/doll-4.jpeg",
    ],
  },
  {
    id: 4,
    name: "Doll Sleep Pouch",
    description:
      "Soft sleep pouch for dolls, made from organic cotton. Features a carrying strap and a cozy interior.",
    category: "Toys",
    price: 20,
    images: ["/images/pouch-1.jpeg", "/images/pouch-2.jpeg"],
  },
  {
    id: 5,
    name: "Quilted Play Wings",
    description:
      "Quilted wings for imaginative play, made from soft cotton. Features adjustable straps and a lightweight design.",
    category: "Toys",
    price: 100,
    images: [
      "/images/wings-1.jpeg",
      "/images/wings-2.jpeg",
      "/images/wings-3.jpeg",
    ],
  },
  {
    id: 6,
    name: "Celebration Bunting",
    description:
      "Handmade bunting made from natural cotton fabrics. Perfect for parties or room decor, featuring a mix of colors and patterns.",
    category: "Home",
    price: 30,
    images: [
      "/images/bunting-1.jpeg",
      "/images/bunting-2.jpeg",
      "/images/bunting-3.jpeg",
    ],
  },
];

// Site configuration
const siteConfig = {
  siteName: "Calendula Child",
  tagline: "Thoughtfully crafted for little ones",
  description:
    "Hand-sewn children's clothing and toys made from natural, sustainable materials.",
  email: "hello@calendulachild.com",
  instagram: "@calendulachild",
};

// HTML template
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteConfig.siteName} - ${siteConfig.tagline}</title>
    <meta name="description" content="${siteConfig.description}">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #2c2c2c;
            background: #fafafa;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* Header */
        header {
            background: white;
            border-bottom: 1px solid #e5e5e5;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .logo {
            font-size: 24px;
            font-weight: 600;
            color: #2c2c2c;
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 32px;
            list-style: none;
        }

        .nav-links a {
            color: #666;
            text-decoration: none;
            font-weight: 400;
            transition: color 0.2s;
        }

        .nav-links a:hover {
            color: #2c2c2c;
        }

        /* Hero Section */
        .hero {
            text-align: center;
            padding: 80px 0 60px;
            background: white;
        }

        .hero h1 {
            font-size: 48px;
            font-weight: 300;
            margin-bottom: 16px;
            color: #2c2c2c;
        }

        .hero p {
            font-size: 18px;
            color: #666;
            max-width: 500px;
            margin: 0 auto;
        }

        /* Products Section */
        .products-section {
            padding: 60px 0 80px;
        }

        .section-title {
            text-align: center;
            font-size: 32px;
            font-weight: 300;
            margin-bottom: 48px;
            color: #2c2c2c;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
        }

        .product-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
            border: 1px solid #e5e5e5;
        }

        .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        /* Carousel Styles */
        .carousel-container {
            position: relative;
            width: 100%;
            height: 280px;
            overflow: hidden;
        }

        .carousel-track {
            display: flex;
            transition: transform 0.3s ease;
            height: 100%;
        }

        .carousel-slide {
            min-width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 14px;
        }

        .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #2c2c2c;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 10;
        }

        .carousel-nav:hover {
            background: rgba(255, 255, 255, 1);
        }

        .carousel-nav.prev {
            left: 12px;
        }

        .carousel-nav.next {
            right: 12px;
        }

        .carousel-container:hover .carousel-nav {
            opacity: 1;
        }

        .carousel-indicators {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            z-index: 10;
        }

        .carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: background 0.2s;
        }

        .carousel-dot.active {
            background: white;
        }

        /* Hide navigation for single images */
        .carousel-container[data-count="1"] .carousel-nav,
        .carousel-container[data-count="1"] .carousel-indicators {
            display: none;
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .modal-close {
            position: absolute;
            top: -50px;
            right: -10px;
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }

        .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .modal-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #2c2c2c;
            transition: background 0.2s;
            z-index: 10;
        }

        .modal-nav:hover {
            background: white;
        }

        .modal-nav.prev {
            left: -70px;
        }

        .modal-nav.next {
            right: -70px;
        }

        .modal-info {
            position: absolute;
            bottom: -60px;
            left: 0;
            right: 0;
            text-align: center;
            color: white;
        }

        .modal-counter {
            font-size: 14px;
            opacity: 0.8;
        }

        /* Hide modal navigation for single images */
        .modal-overlay[data-count="1"] .modal-nav {
            display: none;
        }

        /* Clickable cursor for carousel slides */
        .carousel-slide {
            cursor: pointer;
        }

        /* Mobile modal adjustments */
        @media (max-width: 768px) {
            .modal-nav.prev {
                left: -60px;
            }
            
            .modal-nav.next {
                right: -60px;
            }
            
            .modal-close {
                top: -40px;
                right: 0;
            }
        }

        .product-info {
            padding: 24px;
        }

        .product-category {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #999;
            margin-bottom: 8px;
        }

        .product-name {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 12px;
            color: #2c2c2c;
        }

        .product-description {
            font-size: 14px;
            color: #666;
            line-height: 1.5;
            margin-bottom: 16px;
        }

        .product-price {
            font-size: 16px;
            font-weight: 500;
            color: #2c2c2c;
        }

        /* Footer */
        footer {
            background: #2c2c2c;
            color: white;
            padding: 60px 0 40px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            margin-bottom: 40px;
        }

        .footer-section h3 {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 16px;
        }

        .footer-section p {
            color: #ccc;
            line-height: 1.6;
        }

        .contact-info {
            color: #ccc;
        }

        .contact-info a {
            color: white;
            text-decoration: none;
        }

        .footer-bottom {
            border-top: 1px solid #444;
            padding-top: 24px;
            text-align: center;
            color: #999;
            font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 36px;
            }
            
            .hero p {
                font-size: 16px;
            }
            
            .products-grid {
                grid-template-columns: 1fr;
                gap: 24px;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
                gap: 32px;
            }
            
            .nav-links {
                display: none;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <a href="#" class="logo">${siteConfig.siteName}</a>
                <nav>
                    <ul class="nav-links">
                        <li><a href="#products">Products</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>${siteConfig.siteName}</h1>
            <p>${siteConfig.description}</p>
        </div>
    </section>

    <section id="products" class="products-section">
        <div class="container">
            <h2 class="section-title">Our Collection</h2>
            <div class="products-grid">
                {{PRODUCTS}}
            </div>
        </div>
    </section>

    <footer id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About ${siteConfig.siteName}</h3>
                    <p>We create beautiful, sustainable children's clothing and toys using traditional techniques and natural materials. Each piece is carefully crafted by hand with attention to detail and built to last.</p>
                </div>
                <div class="footer-section">
                    <h3>Get in Touch</h3>
                    <div class="contact-info">
                        <p>Email: <a href="mailto:${siteConfig.email}">${
  siteConfig.email
}</a></p>
                        <p>Instagram: <a href="https://instagram.com/${siteConfig.instagram.substring(
                          1
                        )}" target="_blank">${siteConfig.instagram}</a></p>
                        <p>Custom orders and inquiries welcome</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 ${
                  siteConfig.siteName
                }. Handcrafted with care.</p>
            </div>
        </div>
    </footer>

    <!-- Modal for full-size images -->
    <div class="modal-overlay" id="imageModal">
        <div class="modal-content">
            <button class="modal-close" id="modalClose">&times;</button>
            <button class="modal-nav prev" id="modalPrev">‹</button>
            <button class="modal-nav next" id="modalNext">›</button>
            <img class="modal-image" id="modalImage" src="" alt="">
            <div class="modal-info">
                <div class="modal-counter" id="modalCounter"></div>
            </div>
        </div>
    </div>

    <script>
        // Modal functionality
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        const modalCounter = document.getElementById('modalCounter');
        
        let currentModalImages = [];
        let currentModalIndex = 0;
        
        function openModal(images, index) {
            currentModalImages = images;
            currentModalIndex = index;
            updateModalImage();
            modal.setAttribute('data-count', images.length);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        function updateModalImage() {
            modalImage.src = currentModalImages[currentModalIndex];
            modalCounter.textContent = \`\${currentModalIndex + 1} of \${currentModalImages.length}\`;
        }
        
        function nextModalImage() {
            currentModalIndex = (currentModalIndex + 1) % currentModalImages.length;
            updateModalImage();
        }
        
        function prevModalImage() {
            currentModalIndex = (currentModalIndex - 1 + currentModalImages.length) % currentModalImages.length;
            updateModalImage();
        }
        
        // Modal event listeners
        modalClose.addEventListener('click', closeModal);
        modalNext.addEventListener('click', nextModalImage);
        modalPrev.addEventListener('click', prevModalImage);
        
        // Close modal when clicking overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') prevModalImage();
                if (e.key === 'ArrowRight') nextModalImage();
            }
        });

        // Initialize all carousels
        document.addEventListener('DOMContentLoaded', function() {
            const carousels = document.querySelectorAll('.carousel-container');
            
            carousels.forEach(carousel => {
                const track = carousel.querySelector('.carousel-track');
                const slides = carousel.querySelectorAll('.carousel-slide');
                const prevBtn = carousel.querySelector('.carousel-nav.prev');
                const nextBtn = carousel.querySelector('.carousel-nav.next');
                const dots = carousel.querySelectorAll('.carousel-dot');
                
                // Get all images for this carousel
                const carouselImages = Array.from(slides).map(slide => {
                    const bgImage = slide.style.backgroundImage;
                    return bgImage.slice(5, -2); // Remove 'url("' and '")'
                });
                
                let currentIndex = 0;
                
                function updateCarousel() {
                    const translateX = -currentIndex * 100;
                    track.style.transform = \`translateX(\${translateX}%)\`;
                    
                    // Update dots
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }
                
                function nextSlide() {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateCarousel();
                }
                
                function prevSlide() {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    updateCarousel();
                }
                
                // Event listeners
                if (nextBtn) nextBtn.addEventListener('click', nextSlide);
                if (prevBtn) prevBtn.addEventListener('click', prevSlide);
                
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                    });
                });
                
                // Add click listeners to slides for modal
                slides.forEach((slide, index) => {
                    slide.addEventListener('click', () => {
                        openModal(carouselImages, index);
                    });
                });
                
                // Touch/swipe support
                let startX = 0;
                let isDragging = false;
                
                carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });
                
                carousel.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });
                
                carousel.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    
                    const endX = e.changedTouches[0].clientX;
                    const diffX = startX - endX;
                    
                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            nextSlide();
                        } else {
                            prevSlide();
                        }
                    }
                    
                    isDragging = false;
                });
                
                // Initialize
                updateCarousel();
            });
        });
    </script>
</body>
</html>`;

// Generate product HTML with carousel
function generateProductsHTML(products) {
  return products
    .map((product) => {
      const carouselSlides = product.images
        .map(
          (image) => `
                        <div class="carousel-slide" style="background-image: url('${image}');">
                        </div>`
        )
        .join("");

      const carouselDots = product.images
        .map(
          (_, index) => `
                        <div class="carousel-dot ${
                          index === 0 ? "active" : ""
                        }"></div>`
        )
        .join("");

      return `
                <div class="product-card">
                    <div class="carousel-container" data-count="${
                      product.images.length
                    }">
                        <div class="carousel-track">
                            ${carouselSlides}
                        </div>
                        ${
                          product.images.length > 1
                            ? `
                        <button class="carousel-nav prev">‹</button>
                        <button class="carousel-nav next">›</button>
                        <div class="carousel-indicators">
                            ${carouselDots}
                        </div>
                        `
                            : ""
                        }
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${
                          product.description
                        }</p>
                        <div class="product-price">$${product.price}</div>
                    </div>
                </div>`;
    })
    .join("");
}

// Generate the complete HTML
function generateSite() {
  const productsHTML = generateProductsHTML(products);
  const finalHTML = htmlTemplate.replace("{{PRODUCTS}}", productsHTML);

  // Write to file
  fs.writeFileSync("index.html", finalHTML);
  console.log("✅ Site generated successfully!");
  console.log("📄 Output: index.html");
  console.log(`📦 Generated ${products.length} products`);

  // Optionally create a simple server script
  const serverScript = `// Simple development server
// Run with: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.jpeg': contentType = 'image/jpeg'; break;
    }

    fs.readFile(__dirname + filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
});`;

  fs.writeFileSync("server.js", serverScript);
  console.log("🌐 Development server: server.js");
  console.log("\nTo get started:");
  console.log("1. node generate-site.js  (regenerate site)");
  console.log("2. node server.js         (start dev server)");
  console.log("3. Open http://localhost:3000");
}

// Run the generator
if (require.main === module) {
  generateSite();
}

module.exports = { generateSite, products, siteConfig };
