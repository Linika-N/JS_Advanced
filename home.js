document.getElementById('review-form').onsubmit = function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value.trim();
    const reviewText = document.getElementById('review-text').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (!productName || !reviewText) {
        errorMessage.textContent = 'Оба поля должны быть заполнены';
        return;
    }

    errorMessage.textContent = '';

    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');

   
    if (!reviews[productName]) {
        reviews[productName] = [];
    }
    reviews[productName].push({ id: Date.now(), text: reviewText });

   
    localStorage.setItem('reviews', JSON.stringify(reviews));

  
    document.getElementById('product-name').value = '';
    document.getElementById('review-text').value = '';
};



