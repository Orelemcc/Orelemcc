document.addEventListener('DOMContentLoaded', function() {
    // Datos de las imágenes de la galería (REEMPLAZA ESTAS URLS CON TUS FOTOS REALES)
    const galleryData = [
        {
            src: 'DOCENTE.jpg', // Ruta a tu foto 1
            title: 'Bloque Docente',
            description: 'El imponente edificio principal de la EMCC Matanzas...',
            related: ['Docente3.jpg' , 'Docente2.jpg', 'Docente1.jpg'] // Fotos relacionadas
        },
        {
            src: 'PC2.jpg', // Ruta a tu foto 2
            title: 'Patio de Central',
            description: 'El corazón de la escuela, donde los cadetes...',
            related: ['PC5.jpg', 'PC4.jpg', 'PC3.jpg' , 'PC1.jpg']
        },
        {
            src: 'Aulasdeinformática.jpg', // Ruta a tu foto 3
            title: 'Aulas de Informática',
            description: 'Nuestras modernas aulas equipadas...',
            related: ['Informatica2.jpg']
        },
        {
            src: 'Deportes.jpg', // Ruta a tu foto 4
            title: 'Actividades Deportivas',
            description: 'Los cadetes participan en diversas disciplinas...',
            related: ['Deporte3.jpg', 'Deporte2.jpg', 'Deporte1.jpg', 'Deporte4.jpg']
        },
        {
            src: 'Eventosculturales.jpg', // Ruta a tu foto 5
            title: 'Eventos Culturales',
            description: 'Presentaciones artísticas y culturales...',
            related: ['Evento1.jpg', 'Evento2.jpg', 'Evento3.jpg', 'Evento4.jpg']
        },
        {
            src: 'Graduación.jpg', // Ruta a tu foto 6
            title: 'Ceremonia de Graduación',
            description: 'El momento culminante para cada generación...',
            related: ['Graduación4.jpg', 'Graduación3.jpg', 'Graduación2.jpg', 'Graduación1.jpg']
        }
    ];

    // Crear la galería mejorada
    const galleryGrid = document.querySelector('.gallery-grid');
    
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="img-info">
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 80)}...</p>
                <div class="view-more">Click para ver más <i class="fas fa-arrow-right"></i></div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openModal(item));
        galleryGrid.appendChild(galleryItem);
    });

    // Añadir elementos flotantes decorativos
    addFloatingElements();

    // Funcionalidad del modal mejorada
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalInfo = document.getElementById('modalInfo');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(item) {
        modal.style.display = 'block';
        modalImg.src = item.src;
        modalImg.alt = item.title;
        
        // Información principal + fotos relacionadas
        modalInfo.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <div class="photo-meta">
                <span><i class="fas fa-camera"></i> EMCC Matanzas</span>
                <span><i class="fas fa-user"></i> Archivo Histórico</span>
            </div>
            
            <div class="related-photos">
                <h3>Más Fotos</h3>
                <div class="related-grid"></div>
            </div>
        `;
        
        // Mostrar fotos relacionadas
        const relatedGrid = modalInfo.querySelector('.related-grid');
        item.related.forEach(relatedPhoto => {
            const relatedItem = document.createElement('div');
            relatedItem.className = 'related-item';
            relatedItem.innerHTML = `<img src="${relatedPhoto}" alt="Foto relacionada">`;
            relatedItem.addEventListener('click', (e) => {
                e.stopPropagation();
                // Encontrar la foto relacionada en galleryData
                const fullPhoto = galleryData.find(img => img.src === relatedPhoto) || 
                                 { src: relatedPhoto, title: 'Foto relacionada', description: 'Imagen adicional de la EMCC' };
                openModal(fullPhoto);
            });
            relatedGrid.appendChild(relatedItem);
        });
        
        document.body.style.overflow = 'hidden';
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.style.transition = 'opacity 0.6s ease';
            modalImg.style.opacity = '1';
        }, 100);
    }

    // ... (el resto de las funciones permanecen igual)
    closeBtn.addEventListener('click', closeModal);

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function addFloatingElements() {
        const header = document.querySelector('.header');
        const floatingElements = document.createElement('div');
        floatingElements.className = 'floating-elements';
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            const size = Math.random() * 20 + 5;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.opacity = Math.random() * 0.4 + 0.1;
            element.style.animationDelay = `${Math.random() * 5}s`;
            element.style.animationDuration = `${Math.random() * 20 + 10}s`;
            floatingElements.appendChild(element);
        }
        header.appendChild(floatingElements);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});