
function renderBusinessCards(jsonPath, containerSelector) {
    fetch(jsonPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error('network response was not ok' + response.statusText);
            }
            return response.json();
        })

        .then((businesses) =>{
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.error('Container element not found')
                return;
            }
        container.classList.add('business-container')

        businesses.forEach((business) => {
            const card = document.createElement('div');
            card.classList.add('business-card');

            if (business.membership === 3) {
                card.classList.add('gold');
            } else if (business.membership === 2) {
                card.classList.add('silver');
            } else {
                card.classList.add('bronze')
            }

            const image = document.createElement('img')
            image.src = business.image;
            image.alt = business.name;
            card.appendChild(image);

            const name = document.createElement('h3');
            name.textContent = business.name;
            card.appendChild(name);

            const address = document.createElement('p')
            address.textContent = business.address;
            card.appendChild(address);

            const phone = document.createElement('p');
            phone.textContent = business.phone;
            card.appendChild(phone);

            const website = document.createElement('a')
            website.href = business.website;
            website.textContent = business.website;
            card.appendChild(website)

            container.appendChild(card);
        })
    })
    .catch((error) => {
        console.error('Error fetching the JSON file:', error);
    });
}

renderBusinessCards('./data/members.json', '.business-container');

const hamburgerBtn = document.getElementById('hamburger-btn');
const pageNav = document.querySelector('#page-nav ul')

hamburgerBtn.addEventListener('click', () => {
    pageNav.classList.toggle('active');
})

const yearSpan = document.querySelector('#copyright-year');
    const currentYear = new Date().getFullYear();
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }

    const lastModifiedP = document.querySelector('#lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    }

    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const businessContainer = document.querySelector('.business-container');
    

function renderBusinessCardsView(view) {
    const cards = document.querySelectorAll('.business-card');
    cards.forEach(card => {
        if (view === 'grid') {
            card.classList.remove('list-view');
            card.classList.add('grid-view');
        } else if (view === 'list') {
            card.classList.remove('grid-view');
            card.classList.add('list-view');
        }
    });
}
    
gridViewBtn.addEventListener('click', () => {
    renderBusinessCardsView('grid');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});
    
listViewBtn.addEventListener('click', () => {
    renderBusinessCardsView('list');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});
    
gridViewBtn.classList.add('active');
renderBusinessCardsView('grid');

const darkModeToggle = document.getElementById('dark-mode-toggle');
const rootElement = document.documentElement;


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    rootElement.setAttribute('data-color-mode', savedTheme);
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = rootElement.getAttribute('data-color-mode') === 'dark';
    const newTheme = isDarkMode ? 'light' : 'dark';

    rootElement.setAttribute('data-color-mode', newTheme);
    localStorage.setItem('theme', newTheme);

});

function applyDarkModeToCards() {
    const isDarkMode = document.documentElement.getAttribute('data-color-mode') === 'dark';
    const cards = document.querySelectorAll('.business-card');

    cards.forEach(card => {
        if (isDarkMode) {
            card.style.backgroundColor = 'var(--card-bg)';
            card.style.color = 'var(--card-text)';
        } else {
            card.style.backgroundColor = '';
            card.style.color = '';
        }

        const childElements = card.querySelectorAll('h3, p, a');
        childElements.forEach(child => {
            if (isDarkMode) {
                child.style.color = 'var(--card-text)';
            } else {
                child.style.color = '';
            }
        });
    });
}


darkModeToggle.addEventListener('click', () => {
    applyDarkModeToCards();
});


function renderBusinessCardsView(view) {
    const cards = document.querySelectorAll('.business-card');
    cards.forEach(card => {
        if (view === 'grid') {
            card.classList.remove('list-view');
            card.classList.add('grid-view');
        } else if (view === 'list') {
            card.classList.remove('grid-view');
            card.classList.add('list-view');
        }
    });

    applyDarkModeToCards();
}

