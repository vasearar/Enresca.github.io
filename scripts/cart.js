function addTovarItem() {
  const tovarContainer = document.querySelector('.tovar');

  // Get the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Clear the tovar container
  tovarContainer.innerHTML = '';

  // Iterate through each item in the cart
  cartItems.forEach(function(item) {
    // Create a new tovar-item element
    const tovarItem = document.createElement('div');
    tovarItem.classList.add('tovar-item');

    // Create and append the thumbnail image
    const thumbnail = document.createElement('img');
    thumbnail.src = item.thumbnail;
    tovarItem.appendChild(thumbnail);

    // Create and append the name heading
    const name = document.createElement('h2');
    name.textContent = item.titlu;
    tovarItem.appendChild(name);

    // Create and append the sezon paragraph
    const sezon = document.createElement('p');
    sezon.textContent = `Sezonul: ${item.sezon}`;
    tovarItem.appendChild(sezon);

    // Create and append the culoare paragraph
    const culoare = document.createElement('p');
    culoare.textContent = item.culoare;
    tovarItem.appendChild(culoare);

    // Create and append the price span
    const price = document.createElement('span');
    price.textContent = item.pret;
    tovarItem.appendChild(price);

    // Create and append the Cantitate label
    const cantitateLabel = document.createElement('label');
    cantitateLabel.textContent = 'Cantitate:';
    tovarItem.appendChild(cantitateLabel);

    // Create and append the input element for Cantitate
    const cantitateInput = document.createElement('input');
    cantitateInput.type = 'text';
    cantitateInput.value = '1';
    tovarItem.appendChild(cantitateInput);

    // Create and append the delete image
    const deleteImage = document.createElement('img');
    deleteImage.src = '../source/forDelete.webp';
    deleteImage.setAttribute('id','forDel');
    deleteImage.addEventListener('click', function() {
      // Remove the item from local storage
      const updatedCartItems = cartItems.filter(function(cartItem) {
        return cartItem.thumbnail !== item.thumbnail;
      });

      // Update the cart items in local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Re-render the tovar items
      addTovarItem();
    });
    tovarItem.appendChild(deleteImage);

    // Append the tovar-item to the tovar container
    tovarContainer.appendChild(tovarItem);
  });
}

addTovarItem();

function calculateTotal() {
  const inputs = document.querySelectorAll('input[type="text"]');
  let total = 0;

  inputs.forEach(function(input) {
    const value = parseFloat(input.value);

    if (!isNaN(value)) {
      total += value;
    }
  });

  const totalSpan = document.getElementById('cantitatea');
  totalSpan.textContent = total.toFixed(0);
};

const inputs = document.querySelectorAll('input[type="text"]');
inputs.forEach(function(input) {
  input.addEventListener('input', calculateTotal);
});

calculateTotal();

function calculatePrice() {
  const deAfis = document.querySelector(".total");
  var divs = document.getElementsByClassName("tovar-item");
  var total = 0;

  for (var i = 0; i < divs.length; i++) {
    var input = divs[i].getElementsByTagName("input")[0];
    var price = divs[i].getElementsByTagName("span")[0].innerText;

    // Parse the input value and price as numbers
    var inputValue = parseFloat(input.value);
    var priceValue = parseFloat(price);

    // Multiply input value with price and add it to the total
    if (!isNaN(inputValue) && !isNaN(priceValue)) {
      total += inputValue * priceValue;
    }
  }

  deAfis.innerHTML = `${total}$`;
}


