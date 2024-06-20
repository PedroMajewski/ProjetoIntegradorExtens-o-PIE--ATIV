// Carrossel Versão MOBILE

function carouselMobileDiferencial() {
    if (window.innerWidth <= 900) {
        const centroDif = document.getElementById("diferencial2");
        const esquerdaDif = document.getElementById("diferencial1");
        const direitaDif = document.getElementById("diferencial3");
        const elementosDif = Array.from(document.querySelectorAll(".div-carroselDiferencial > div"));
        const containerDif = document.getElementById("div-carroselDiferencial");
        const dotsDif = document.querySelectorAll(".dotD");

        let startX;
        let index = 1; // Índice do card central

        containerDif.addEventListener('touchstart', handleTouchStart, false);
        containerDif.addEventListener('touchmove', handleTouchMove, false);
        containerDif.addEventListener('touchend', handleTouchEnd, false);

        dotsDif.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i); 
            });//Evento de clique em cada DOT :)
        });

        containerDif.addEventListener('touchstart', function(event) {
            event.stopPropagation();
        });

        function handleTouchStart(event) {
            startX = event.touches[0].clientX;
            containerDif.style.transition = 'none';
            
        }

        function handleTouchMove(event) {
            
        }

        function handleTouchEnd(event) {
            const endX = event.changedTouches[0].clientX;
            const diffX = endX - startX;

            if (diffX > 50) {
                prevSlide();
            } else if (diffX < -50) {
                nextSlide();
            } else {
                containerDif.style.transition = 'transform 0.5s ease-in-out';
                containerDif.style.transform = `translateX(${startOffset}px)`;
            }
            containerDif.style.transition = 'transform 0.5s ease-in-out';
            event.preventDefault();
        }

        function prevSlide() {
            containerDif.insertBefore(elementosDif[elementosDif.length - 1], elementosDif[0]);
            elementosDif.unshift(elementosDif.pop());
            updateSlides();
            updateDotHighlight();
        }

        function nextSlide() {
            containerDif.appendChild(elementosDif[0]);
            elementosDif.push(elementosDif.shift());
            updateSlides();
            updateDotHighlight();
        }

        function goToSlide(index) {
            const currentIndex = 1;
            const diff = index - currentIndex;

            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    nextSlide();
                }
            } else {
                for (let i = 0; i > diff; i--) {
                    prevSlide();
                }
            }
        }

        function updateSlides() {
            elementosDif.forEach((el, index) => {
                const distanceFromCenter = index - 1; 
                const scaleFactor = Math.pow(0.8, Math.abs(distanceFromCenter)); 
                const opacityFactor = Math.pow(0.7, Math.abs(distanceFromCenter));

                el.style.transform = `translateX(${distanceFromCenter * 100}%) scale(${scaleFactor})`;
                el.style.opacity = opacityFactor;
            });
        }

        function updateDotHighlight() {
            
            dotsDif.forEach(dot => {
                dot.classList.remove('highlight');
            });

            //Faz com que o DOT respectivo esteja com a classe "highlight"
            if (elementosDif[1] === centroDif) {
                dotsDif[1].classList.add('highlight');
            } else if (elementosDif[1] === esquerdaDif) {
                dotsDif[0].classList.add('highlight');
            } else if (elementosDif[1] === direitaDif) {
                dotsDif[2].classList.add('highlight');
            }
        }

        goToSlide();
        updateSlides();
        updateDotHighlight();
    }
}

window.addEventListener('load', carouselMobileDiferencial);
window.addEventListener('resize', carouselMobileDiferencial);