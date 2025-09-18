import { useEffect } from 'react';

export default function YourPage() {
  useEffect(() => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
      });
    });
  }, []);
}
// This code adds a box shadow effect to the feature cards when the user hovers over them.