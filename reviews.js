function deleteReview(productName, reviewId) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    reviews[productName] = reviews[productName].filter(review => review.id !== reviewId);

    if (reviews[productName].length === 0) {
        delete reviews[productName];
    }

    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
}

function toggleReviews(event) {
    const reviewsElement = event.target.nextElementSibling;
    if (reviewsElement.style.display === 'none') {
        reviewsElement.style.display = 'block';
        event.target.textContent = 'Скрыть отзывы';
    } else {
        reviewsElement.style.display = 'none';
        event.target.textContent = 'Показать отзывы';
    }
}

function loadReviews() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');

    for (const [productName, productReviews] of Object.entries(reviews)) {
        const productElement = document.createElement('div');
        const reviewsList = document.createElement('ul');
        reviewsList.style.display = 'none';

        productReviews.forEach(review => {
            const reviewItem = document.createElement('li');
            reviewItem.textContent = review.text;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = () => deleteReview(productName, review.id);
            reviewItem.appendChild(deleteButton);
            reviewsList.appendChild(reviewItem);
        });

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Показать';
        toggleButton.onclick = toggleReviews;

        productElement.appendChild(document.createTextNode(productName));
        productElement.appendChild(toggleButton);
        productElement.appendChild(reviewsList);
        productsContainer.appendChild(productElement);
    }
}

loadReviews();
