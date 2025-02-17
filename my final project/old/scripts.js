//Ham menu scripts

document.addEventListener('DOMContentLoaded', () => {

    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');

    if (hamMenu) {
        hamMenu.addEventListener('click', () => {
            hamMenu.classList.toggle('active');
            offScreenMenu.classList.toggle('active');
        });
    }

    if (document.body.classList.contains('tshirts-page')) {
        renderProducts('data/products.json', '#product-grid');
    }

    if (document.body.classList.contains('checkout-page')) {
        // Render the cart summary from localStorage
        const cartItemsList = document.getElementById('cart-items');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price}`;
                cartItemsList.appendChild(li);
            });
        }

        // Handle checkout form submission
        const checkoutForm = document.getElementById('checkout');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function (event) {
                event.preventDefault();
                // Here you would normally validate and process payment details.
                alert('Purchase complete! Thank you for your order.');
                // Clear the cart after successful purchase
                localStorage.removeItem('cart');
                // Optionally, redirect the user back to the home page
                window.location.href = 'index.html';
            });
        }
    }
});

async function renderProducts(jsonPath, containerSelector, category) {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        // Parse the JSON data
        const data = await response.json();
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error('Container element not found');
            return;
        }

        // Optional: Add a class to the container for styling purposes
        container.classList.add('product-grid');

        // Iterate over the tshirt products and create a card for each
        data.tshirts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button data-product-id="${product.id}">Add to Cart</button>
            `;

            const button = card.querySelector('button');
            button.addEventListener('click', () => {
                addToCart(product);
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function addToCart(product) {
    // Retrieve the existing cart from localStorage or create an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(product);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${product.name} added to cart!`);
  }
