/* ============================================
   RENAISSANCE - CONVERSION JAVASCRIPT
   WhatsApp Integration & Form Handling
   ============================================ */

// ========== INITIALIZE AOS ANIMATIONS ==========
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// ========== WHATSAPP FUNCTION (ROBUST & FAIL-SAFE) ==========
function openWhatsApp() {
    const phoneNumber = '919518780921'; // Remove + and spaces
    const message = encodeURIComponent('Hi! I am interested in the Renaissance program for my child. Could you share more details?');
    
    // Detect mobile or desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let whatsappURL;
    
    if (isMobile) {
        // Mobile: Use whatsapp://
        whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    } else {
        // Desktop: Use web.whatsapp.com
        whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }
    
    // Open in new tab
    window.open(whatsappURL, '_blank');
}

// ========== FORM SUBMISSION HANDLER ==========
const admissionsForm = document.getElementById('admissionsForm');

admissionsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const parentName = document.getElementById('parentName').value;
    const childAge = document.getElementById('childAge').value;
    const phone = document.getElementById('phone').value;
    
    // Validate phone number (basic)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }
    
    // Create personalized WhatsApp message
    const personalizedMessage = encodeURIComponent(
        `Hi! My name is ${parentName}. I'm interested in the Renaissance program for my ${childAge}-year-old child. Could you share more details?`
    );
    
    const phoneNumber = '919518780921';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let whatsappURL;
    
    if (isMobile) {
        whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${personalizedMessage}`;
    } else {
        whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${personalizedMessage}`;
    }
    
    // Success feedback
    const submitBtn = admissionsForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '✓ Opening WhatsApp...';
    submitBtn.classList.add('opacity-75');
    
    // Open WhatsApp
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        
        // Reset form
        admissionsForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('opacity-75');
        
        // Show success message
        alert('Thank you! We\'ll connect with you shortly on WhatsApp.');
    }, 500);
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
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
console.log('%c Renaissance %c Premium Conversion Engine ', 
    'background: #2A1B12; color: #D4AF37; font-size: 16px; padding: 8px;',
    'background: #D4AF37; color: #2A1B12; font-size: 16px; padding: 8px;'
);
