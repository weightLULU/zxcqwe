let productCounters = JSON.parse(localStorage.getItem('productCounters')) || {};

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function addToCart(productName, price, event, productId) {
    if (!productCounters[productName]) {
        productCounters[productName] = 0;
    }

    const cartItems = document.getElementById('cartItems');
    const listItem = document.createElement('li');
    listItem.textContent = `${productName} - $${price}`;

    // Добавляем кнопку удаления с классом стиля
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.classList.add('cart-remove-button'); // Добавляем класс стиля
    removeButton.addEventListener('click', () => removeFromCart(productName, listItem));
    listItem.appendChild(removeButton);

    cartItems.appendChild(listItem);

    // Обновляем сумму заказа при добавлении товара
    updateTotalAmount();

    // Изменяем цвет кнопки "В корзину" для конкретного товара
    const addButton = event.target;
    addButton.style.backgroundColor = '#6bfa6b';

    // Увеличиваем счетчик для конкретного продукта и обновляем текст кнопки
    productCounters[productName]++;
    addButton.textContent = `В корзине ${productCounters[productName]}`;
}

function removeFromCart(productName, listItem) {
    // Уменьшаем счетчик для конкретного продукта и обновляем текст кнопки
    productCounters[productName]--;
    const addButton = document.querySelector(`button[data-product="${productName}"]`);
    addButton.textContent = `В корзине ${productCounters[productName]}`;

    // Если количество товара в корзине достигло нуля, удаляем кнопку и элемент из корзины
    if (productCounters[productName] === 0) {
        delete productCounters[productName];
        addButton.style.backgroundColor = ''; // Сбрасываем цвет кнопки
    }

    // Удаляем соответствующий элемент из списка корзины
    listItem.remove();

    // Обновляем сумму заказа при удалении товара
    updateTotalAmount();
}

function updateTotalAmount() {
    const cartItems = document.getElementById('cartItems').querySelectorAll('li');
    let totalAmount = 0;

    cartItems.forEach(item => {
        const priceString = item.textContent.match(/\$([\d.]+)/);
        if (priceString) {
            const price = parseFloat(priceString[1]);
            totalAmount += price;
        }
    });

    document.getElementById('totalAmount').textContent = `Сумма заказа: $${totalAmount.toFixed(2)}`;
}


function checkout() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const totalAmount = document.getElementById('totalAmount');
    const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');

    const cartItems = document.getElementById('cartItems').querySelectorAll('li');
    if (cartItems.length === 0) {
        showNotification("Выберите товар перед оформлением заказа");
        return;
    }

    const orderData = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        totalAmount: totalAmount.textContent,
        paymentMethod: paymentMethodInput.value,
    };

    console.log('Имя:', orderData.name);
    console.log('Телефон:', orderData.phone);
    console.log('Email:', orderData.email);
    console.log('Метод оплаты:', orderData.paymentMethod);

    saveOrder(orderData);
}

function saveOrder(orderData) {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    savedOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(savedOrders));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    notification.style.position = 'fixed';
    notification.style.bottom = '40px';
    notification.style.right = '40px';
    notification.style.padding = '10px';
    notification.style.background = '#333';
    notification.style.color = '#fff';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';

    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

