//Ham menu scripts

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    if (hamMenu) {
        hamMenu.addEventListener('click', () => {
            hamMenu.classList.toggle('active');
            offScreenMenu.classList.toggle('active');
        });
    }

    // Render Products for T-Shirts and Hoodies Pages
    if (document.body.classList.contains('tshirts-page')) {
        renderProducts('data/products.json', '#product-grid', 'tshirts');
    }
    if (document.body.classList.contains('hoodies-page')) {
        renderProducts('data/products.json', '#product-grid', 'hoodies');
    }

    // Checkout Page Functionality
    if (document.body.classList.contains('checkout-page')) {
        // Render the cart summary
        const cartItemsList = document.getElementById('cart-items');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItemsList.appendChild(li);
            });
            // Calculate and display total
            const total = cart.reduce((sum, product) => sum + Number(product.price), 0);
            const totalElement = document.createElement('p');
            totalElement.id = 'cart-total';
            totalElement.textContent = `Total: $${total.toFixed(2)}`;
            cartItemsList.parentElement.appendChild(totalElement);
        }

        // Handle checkout form submission with modal
        const checkoutForm = document.getElementById('checkout');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const thankYouModal = document.getElementById('thankYouModal');
                if (thankYouModal) {
                    thankYouModal.style.display = 'block';
                }
            });
        }
    }

    // Setup "Item Added" Modal (for when an item is added to the cart)
    const itemAddedModal = document.getElementById('itemAddedModal');
    if (itemAddedModal) {
        const closeItemBtn = itemAddedModal.querySelector('.close-item');
        const itemOkBtn = document.getElementById('item-added-ok');

        function closeItemModal() {
            itemAddedModal.style.display = 'none';
        }

        closeItemBtn.addEventListener('click', closeItemModal);
        itemOkBtn.addEventListener('click', closeItemModal);

        window.addEventListener('click', function(event) {
            if (event.target === itemAddedModal) {
                closeItemModal();
            }
        });
    }

    // Setup "Thank You" Modal (for checkout completion)
    if (document.body.classList.contains('checkout-page')) {
        const thankYouModal = document.getElementById('thankYouModal');
        if (thankYouModal) {
            const closeThankYouBtn = thankYouModal.querySelector('.close');
            const modalOkBtn = document.getElementById('modal-ok');

            function closeThankYouModal() {
                thankYouModal.style.display = 'none';
                // Clear the cart and redirect after closing the modal
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            }

            closeThankYouBtn.addEventListener('click', closeThankYouModal);
            modalOkBtn.addEventListener('click', closeThankYouModal);

            window.addEventListener('click', function(event) {
                if (event.target === thankYouModal) {
                    closeThankYouModal();
                }
            });
        }
    }
});

// Function to render product cards
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

        container.classList.add('product-grid');

        const products = data[category];
        if (!products) {
            console.error(`No products found for category: ${category}`);
            return;
        }

        // Iterate over the tshirt products and create a card for each
        products.forEach(product => {
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

// Function to add items to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    const itemAddedModal = document.getElementById('itemAddedModal');
    if (itemAddedModal) {
        itemAddedModal.style.display = 'block';
    }
}

// Function to calculate cart total
function calculateCartTotal(cart) {
    return cart.reduce((total, product) => total + Number(product.price), 0);
}
