let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
}

// scroll spy 
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.header .navbar a');

window.onscroll = () =>{
  searchForm.classList.remove('active');
  navbar.classList.remove('active');

  if(window.scrollY > 0){
    document.querySelector('.header').classList.add('active');
  }else{
    document.querySelector('.header').classList.remove('active');
  }

  section.forEach(sec =>{
    let top = window.scrollY;
    let offset = sec.offsetTop - 200;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(link =>{
        link.classList.remove('active');
        document.querySelector('.header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

};

window.addEventListener("load", function() {
  // Cek scroll position
  if(window.scrollY > 0){
    document.querySelector('.header').classList.add('active');
  }else{
    document.querySelector('.header').classList.remove('active');
  }

  // Handle loader
  if (document.getElementById("loader")) {
    setTimeout(function() {
      document.getElementById("loader").style.display = "none";
    }, 1500);
  }

  // Handle loader container
  const loaderContainer = document.querySelector('.loader-container');
  if (loaderContainer) {
    setTimeout(() => {
      loaderContainer.classList.add('fade-out');
    }, 2000);
  }
});

var swiper = new Swiper(".home-slider", {
  spaceBetween: 20,
  effect: "fade",
  loop:true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".products-slider", {
  spaceBetween: 20,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  grabCursor:true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener('alpine:init', () => {
  Alpine.store('cart', {
    items: [],
    open: false,
    
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({
          ...product,
          quantity: 1
        });
      }
    },
    
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    
    updateQuantity(productId, change) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
    
    getTotal() {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  });
});

// Initialize EmailJS with your public key
(function() {
    emailjs.init("0ZPOcv-8MfBZ6p8Ah"); // Replace with your actual public key
})();

// Handle form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        phone: this.querySelector('input[name="phone"]').value,
        message: this.querySelector('textarea[name="message"]').value
    };
    
    // Show loading state
    const submitBtn = this.querySelector('input[type="submit"]');
    const originalText = submitBtn.value;
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.send(
        "service_qsvuclb", // Replace with your EmailJS service ID
        "template_a1s2c2t", // Replace with your template ID
        formData
    )
    .then(function() {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Restore button state
        submitBtn.value = originalText;
        submitBtn.disabled = false;
    });
  });
}