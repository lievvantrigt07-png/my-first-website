const cakesList = document.getElementById('cakesList');
const cakesStatus = document.getElementById('cakesStatus');
const artClasses = ['art-strawberry', 'art-chocolate', 'art-vanilla'];

async function loadCakes() {
  cakesStatus.textContent = 'Loading cakes...';
  cakesStatus.className = 'text-center text-secondary mt-4';

  try {
    const cakes = await window.CakeShopApi.getCakes();
    cakesList.textContent = '';

    if (cakes.length === 0) {
      cakesStatus.textContent = 'No cakes are available right now.';
      return;
    }

    for (let i = 0; i < cakes.length; i++) {
      const cake = cakes[i];
      const column = document.createElement('div');
      column.className = 'col-md-6 col-lg-4';

      const card = document.createElement('article');
      card.className = 'product-card';

      const art = document.createElement('div');
      art.className = `product-art ${artClasses[i % artClasses.length]}`;

      const image = document.createElement('span');
      image.textContent = cake.image || '🎂';
      image.setAttribute('aria-hidden', 'true');
      art.appendChild(image);

      const content = document.createElement('div');
      content.className = 'p-4';

      const name = document.createElement('h2');
      name.textContent = cake.name;

      const description = document.createElement('p');
      description.textContent = cake.description;

      const price = document.createElement('span');
      price.className = 'price';
      price.textContent = `$${Number(cake.price).toFixed(2)}`;

      content.appendChild(name);
      content.appendChild(description);
      content.appendChild(price);
      card.appendChild(art);
      card.appendChild(content);
      column.appendChild(card);
      cakesList.appendChild(column);
    }

    cakesStatus.textContent = '';
    cakesStatus.className = 'd-none';
  } catch (error) {
    cakesList.textContent = '';

    if (error instanceof Error) {
      cakesStatus.textContent = error.message;
    } else {
      cakesStatus.textContent = 'Something went wrong while loading the cakes.';
    }

    cakesStatus.className = 'text-center text-danger mt-4';
  }
}

loadCakes();