
document.addEventListener('DOMContentLoaded', function() {
    // Open modal when "More Info" is clicked
    const modalLinks = document.querySelectorAll('.open-modal');
    modalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        const modalId = this.parentElement.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'flex'; // Show modal with Flexbox centering
          // Set focus to the modal content for keyboard users
          const modalContent = modal.querySelector('.modal-content');
          if (modalContent) {
            modalContent.focus();
          }
        }
      });
    });
  
    // Close modal when the close button is clicked
    const closeButtons = document.querySelectorAll('.modal .close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
      });
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });
  
    // Close modal when pressing the Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
          modal.style.display = 'none';
        });
      }
    });
  });
  