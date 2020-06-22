if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInput = document.getElementsByClassName('cart-quantity-input')
    for(i=0; i<quantityInput.length; i++){
        input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartBtn = document.getElementsByClassName('shop-item-button');
    for (i=0; i<addToCartBtn.length; i++){
        btn = addToCartBtn[i]
        btn.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', removeAllItems)
}
function removeAllItems(){
    alert('thank you for your purchase')
    let items = document.getElementsByClassName('cart-items')[0]
    while(items.hasChildNodes()){
        items.removeChild(items.firstChild)
    }
    updateCart()
}

function quantityChanged (e){
    input = e.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCart()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCart()
}

function addToCartClicked(e){
    btn = e.target;
    shopItem = btn.parentElement.parentElement;
    title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, image)
}

function addItemToCart(title, price, image){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartItems = document.getElementsByClassName('cart-items')[0];
    itemName = cartItems.getElementsByClassName('cart-item-title');
    for (i=0; i<itemName.length; i++){
        if(itemName[i].innerText == title){
        alert('This item is already added to the cart')
        return
    }}
    cartRowContent = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src=${image} width="100" height="100">
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow)
    updateCart()
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function  updateCart(){
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0
    for(let i=0; i < cartRows.length; i++){
    let cartRow= cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    let price = parseFloat(priceElement.innerText.replace('$', ''))
    let quantity = quantityElement.value
    total = total + (price * quantity)
   }
   total = Math.round(total*100)/100
   document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}