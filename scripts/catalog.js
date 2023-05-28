const marga = [
  {
    "titlu":"Sinclair Nappa Ciubote",
    "gen":"Femei",
    "sezon":"Rece",
    "pret":"189$",
    "thumbnail":"../source/catalog/2.webp"
  },
  {
    "titlu":"Pas ușor",
    "gen":"Barbati",
    "sezon":"Cald",
    "pret":"100$",
    "thumbnail":"../source/catalog/1.webp"
  },
  {
    "titlu":"Zburdălăiță",
    "gen":"Femei",
    "sezon":"Cald",
    "pret":"129$",
    "thumbnail":"../source/catalog/3.webp"
  },
  {
    "titlu":"Bocanci Solari",
    "gen":"Barbati",
    "sezon":"Cald",
    "pret":"80$",
    "thumbnail":"../source/catalog/4.webp"
  },
  {
    "titlu":"Teniși Văluritori",
    "gen":"Femei",
    "sezon":"Cald",
    "pret":"200$",
    "thumbnail":"../source/catalog/5.webp"
  },
  {
    "titlu":"Pantofi Odihnitori",
    "gen":"Femei",
    "sezon":"Cald",
    "pret":"200$",
    "thumbnail":"../source/catalog/6.webp"
  },
  {
    "titlu":"Drumeție Zenită",
    "gen":"Barbati",
    "sezon":"Rece",
    "pret":"149$",
    "thumbnail":"../source/catalog/7.webp"
  },
  {
    "titlu":"Sandale Îmbărbătătoare",
    "gen":"Barbati",
    "sezon":"Cald",
    "pret":"131$",
    "thumbnail":"../source/catalog/8.webp"
  },
  {
    "titlu":"Balerini Solari",
    "gen":"Femei",
    "sezon":"Cald",
    "pret":"170$",
    "thumbnail":"../source/catalog/9.webp"
  },
  {
    "titlu":"Viteza Vârtej",
    "gen":"Barbati",
    "sezon":"Rece",
    "pret":"179$",
    "thumbnail":"../source/catalog/10.webp"
  },
  {
    "titlu":"Pantofi Alunecători",
    "gen":"Femei",
    "sezon":"Rece",
    "pret":"150$",
    "thumbnail":"../source/catalog/11.webp"
  },
  {
    "titlu":"Cizme Îmbătătoare",
    "gen":"Copii",
    "sezon":"Rece",
    "pret":"300$",
    "thumbnail":"../source/catalog/12.webp"
  },
  {
    "titlu":"Saboti Sireni",
    "gen":"Copii",
    "sezon":"Cald",
    "pret":"90$",
    "thumbnail":"../source/catalog/13.webp"
  },
  {
    "titlu":"Încălțăminte Isteță",
    "gen":"Copii",
    "sezon":"Cald",
    "pret":"107$",
    "thumbnail":"../source/catalog/14.webp"
  },
  {
    "titlu":"Ghetuțe Sclipitoare",
    "gen":"Copii",
    "sezon":"Rece",
    "pret":"120$",
    "thumbnail":"../source/catalog/15.webp"
  }
]

let toDisplay = marga;

function filterAndDisplay() {
  const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]:checked');
  const selectedGen = [];
  const selectedSezon = [];
  const selectedPrice = [];

  checkboxes.forEach(function (checkbox) {
    const id = checkbox.id;
    if (id === 'Femei' || id === 'Barbati' || id === 'Copii') {
      selectedGen.push(id);
    } else if (id === 'Cald' || id === 'Rece') {
      selectedSezon.push(id);
    } else if (id === 'fromZero' || id === 'fromCinci' || id === 'fromSuta' || id === 'scumpe') {
      selectedPrice.push(id);
    }
  });

  toDisplay = marga.filter(function (item) {
    const price = parseInt(item.pret.replace('$', ''));
    const hasGen = selectedGen.length === 0 || selectedGen.includes(item.gen);
    const hasSezon = selectedSezon.length === 0 || selectedSezon.includes(item.sezon);
    const hasPrice = selectedPrice.length === 0 || selectedPrice.includes(getPriceRange(price));

    return hasGen && hasSezon && hasPrice;
  });

  addItemsToMarfa();
}

function getPriceRange(price) {
  if (price >= 0 && price <= 50) {
    return 'fromZero';
  } else if (price > 50 && price <= 100) {
    return 'fromCinci';
  } else if (price > 100 && price <= 150) {
    return 'fromSuta';
  } else {
    return 'scumpe';
  }
}

function addToCart(item) {
  // se iau obiectele initial aflate in local storage intr-un array
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // verifica daca itemul deja este in local storage
  const isItemInCart = cartItems.some(cartItem => cartItem.titlu === item.titlu);

  // Daca obiectul nui atunci el se adauga
  if (!isItemInCart) {
    cartItems.push(item);
    // salveaza obiectele 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } else {
    console.log('');
  }
}

function addItemsToMarfa() {
  const marfaContainer = document.querySelector('.marfa');
  marfaContainer.innerHTML = '';

  toDisplay.forEach(function (item) {
    const marfaItem = document.createElement('div');
    marfaItem.classList.add('marfa-item');

    const thumbnail = document.createElement('img');
    thumbnail.src = item.thumbnail;
    marfaItem.appendChild(thumbnail);

    const hiddenData = document.createElement('div');
    hiddenData.classList.add('hidden-data');

    const gen = document.createElement('div');
    gen.textContent = item.gen;
    hiddenData.appendChild(gen);

    const sezon = document.createElement('div');
    sezon.textContent = item.sezon;
    hiddenData.appendChild(sezon);

    marfaItem.appendChild(hiddenData);

    const name = document.createElement('p');
    name.textContent = item.titlu;
    marfaItem.appendChild(name);

    name.addEventListener('click', function() {
      window.location.href = 'individual.html';
    });

    const price = document.createElement('span');
    price.textContent = item.pret;
    marfaItem.appendChild(price);

    const addToCartImage = document.createElement('img');
    addToCartImage.src = '../source/catalog/addToCart.webp';
    addToCartImage.addEventListener('click', function(event) {
      event.stopPropagation(); 
      addToCart(item);
    });
    marfaItem.appendChild(addToCartImage);

    marfaContainer.appendChild(marfaItem);
  });
}


// chemarea functiei pentru a arata obiectele initiale
filterAndDisplay();

// Event listener pentru a prinde modidicarile in filtre
const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', filterAndDisplay);
});


