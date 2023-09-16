
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.section-one h1');
    const words = text.textContent.split(' ');
    
    text.innerHTML = '';
    
    words.forEach(word => {
        const div = document.createElement('div');
        div.textContent = word;
        text.appendChild(div);
    });
    
    const divs = document.querySelectorAll('.section-one h1 div');
    
    gsap.from(divs, {
        opacity: 0,
        x: -50,
        duration: 1.5,
        delay: 0.5,
        stagger: 0.1
    });
    
    const box = document.querySelector('.box');
    const h2 = document.querySelector('h2');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          gsap.from(box, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: 'back.out(1.7)'
          });
    
          gsap.from(h2, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5
          });
          box.classList.add('show-box');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(box);
    
    function lineTextAnimation() {
        const boxes = document.querySelectorAll('.box--orange h2');
      
        boxes.forEach(box => {
          gsap.set(box, { opacity: 0, y: 50 });
        });
      
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
      
        const reverseObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio <= 0.5) {
              gsap.to(entry.target, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out' });
              observer.observe(entry.target);
            } else if (!entry.isIntersecting) {
              gsap.set(entry.target, { opacity: 0, y: 50 });
            }
          });
        }, { rootMargin: '-50% 0px' });
      
        boxes.forEach(box => {
          observer.observe(box);
          reverseObserver.observe(box);
        });
      }
      
      lineTextAnimation();
});