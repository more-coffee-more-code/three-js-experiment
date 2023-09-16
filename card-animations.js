const cards = document.querySelectorAll('.card');

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        gsap.from(entry.target, {
          opacity: 0,
          y: 100,
          scale: 0.5,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          delay: index * 0.2,
          onStart: () => {
            entry.target.style.visibility = 'visible';
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  cards.forEach((card, index) => {
    observer.observe(card);

    // Reset the card's opacity to 1 in case it was hidden by the observer
    gsap.set(card, { opacity: 1 });

    // Add a delay to the card's initial state to create a staggered animation effect
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'back.out(1.7)',
      delay: index * 0.2
    });
  });
});