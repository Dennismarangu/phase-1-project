// Get a reference to the DOM elements we'll be working with
const artworkList = document.querySelector('#artwork-list');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const favoritesList = document.querySelector('#Favorites-list');
const likesList = document.querySelector('#Likes-list')
const userFavorites = [];
// eventlistener  used to display more information about an artwork when it is clicked.
artworkList.addEventListener('click', (event) => {
  const artworkId = event.target.dataset.artworkId;
  if (artworkId) {
    console.log(`User clicked on artwork with ID: ${artworkId}`);
    fetchArtworkDetails(artworkId);
  }
});

// Listen for the DOMContentLoaded event to fire
document.addEventListener('DOMContentLoaded', () => {
  // When the page loads, fetch data from the API and render it on the page
  fetchArtworks();
});

// Listen for the submit event on the search form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  console.log(`User searched for: ${searchTerm}`);
  fetchArtworks(searchTerm);
});

// Listen for the click event on the artwork list
artworkList.addEventListener('click', (event) => {
  // When an artwork is clicked, display more information about it
  const artworkId = event.target.dataset.artworkId;
  if (artworkId) {
    fetchArtworkDetails(artworkId);
  }
});

function renderArtworks(artworks) {
  const container = document.getElementById('artworks-container');

  // Clear any previous search results
  container.innerHTML = '';

  // Loop through each artwork and create an element for it
  artworks.forEach((artwork) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h2>${artwork.title}</h2>
      <img src="${artwork.thumbnail.url}">
      <p>${artwork.artist_display}</p>
    `;

    // Append the element to the container
    container.appendChild(element);
  });
}

// Define a function to fetch artworks from the API
function fetchArtworks(searchTerm) {
  let url = 'https://api.artic.edu/api/v1/artworks';
  if (searchTerm) {
    url += `?q=${searchTerm}`;
  }
  fetch(url)
    .then(response => response.json())
    .then(data => renderArtworks(data.data))
    .catch(error => console.error(error));
}

// Define a function to fetch details about a specific artwork
function fetchArtworkDetails(artworkId) {
  const url = `https://api.artic.edu/api/v1/artworks/${artworkId}`;
  fetch(url)
    .then(response => response.json())
    .then(data => renderArtworkDetails(data.data))
    .catch(error => console.error(error));
}

// Define a function to render a list of artworks on the page
function renderArtworks(artworks) {
  console.log(artworks)
  artworkList.innerHTML = '';
  artworks.forEach(artwork => {
    const listItem = document.createElement('li');
    listItem.dataset.artworkId = artwork.id;
    const thumbnailImg = document.createElement('img');
    // thumbnailImg.src = artwork.thumbnail.lqip;
    thumbnailImg.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
     thumbnailImg.width = "100px"
     thumbnailImg.height = "100px"
    // thumbnailImg.alt = artwork.publication_history;
    
      //   // Set the srcset attribute with multiple image sources
      //   thumbnailImg.srcset = `
      //    ${artwork.thumbnail.src}
      //    ${artwork.thumbnail.width}w,
      //    ${artwork.thumbnail.url}
      //    ${artwork.thumbnail.height}
      //    ${artwork.thumbnail.alt_text}
      //    ${artwork.publication_history}
      //  `;
       
      // Check if the thumbnail object exists before accessing its properties
       if (artwork.thumbnail) {
        thumbnailImg.width = artwork.thumbnail.width;
        thumbnailImg.height = artwork.thumbnail.height;
        thumbnailImg.alt = artwork.publication_history;
      }

// Define an array to store the user's favorite artworks
function addToFavorites(artwork) {
  // The function checks if the artwork is already in the array using the some method, which returns true if at least one element in the array satisfies the provided callback function. If the artwork is not already in the array, it is added using the push method.
  if (userFavorites.some(item => item.id === artwork.id)) {
    console.log(`"${artwork.title}" removed from your favorites.`);
  } else {
    // Add the artwork to the user's favorites
    userFavorites.push(artwork);
    console.log(`"${artwork.title}" has been added to your favorites!`);
  }
}
    const favoriteBtn = document.createElement('button')
    favoriteBtn.innerText = 'Add to Favorites';
    favoriteBtn.addEventListener('click', () => {
      // Add code to handle adding the artwork to the user's favorites
      addToFavorites(artwork)
      // document.getElementById('Favourites-list').innerHTML = `Favourites-list: ${userFavorites}`
      // event.target.classList.add('bookmark-animation');
        
      // Toggle the "bookmark-animation" class on and off for the "Add to Favorites" button
       event.target.classList.toggle('bookmark-animation');
      
       // setTimeout((event) => {
      //   event.target.classList.remove('bookmark-animation');
      //   event.target.classList.add('finished');
      //   setTimeout(() => {
      //     event.target.classList.remove('finished');
      //   }, 3000);
      // }, 3000);
    
    });
  
  // Create heart icon and make it persist
  const heart = document.createElement('i');
  heart.classList.add('fa', 'fa-heart-o');
  heart.dataset.item = artwork.id;
  // Check if movie is already in favorites
  if (localStorage.getItem(artwork.id)) {
  heart.classList.remove('fa-heart-o')
  heart.classList.add('fa-heart', 'red');
  }
  // Add event listener to toggle heart on click
  
  heart.addEventListener('click', (event) => {
  event.preventDefault();
  const targetHeart = event.target;
  const item = targetHeart.dataset.item;
  const isFavorite = targetHeart.classList.contains('fa-heart');
  if (isFavorite) {
      targetHeart.classList.remove('fa-heart', 'red');
      targetHeart.classList.add('fa-heart-o');
      localStorage.removeItem(item);
  } else {
      targetHeart.classList.remove('fa-heart-o');
      targetHeart.classList.add('fa-heart', 'red');
      localStorage.setItem(item, 'true');
  }
  });

  const description=document.createElement("p")
  description.textContent=artwork.title

    listItem.appendChild(thumbnailImg);
    listItem.appendChild(description);
    // listItem.appendChild(likeBtn);
    listItem.appendChild(favoriteBtn);
    listItem.appendChild(heart);

    artworkList.appendChild(listItem);
});
}

// Define a function to render details about a specific artwork on the page
function renderArtworkDetails(artwork) {
  const detailsContainer = document.querySelector('#artwork-details');
  detailsContainer.innerHTML = `
    <h2>${artwork.title}</h2>
    <p>${artwork.artist_title}</p>
    <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg"
    width="${artwork.thumbnail.width}" 
    height="${artwork.thumbnail.height}" 
    alt="${artwork.thumbnail.alt_text}"
    alt= "${artwork.publication_history}">
  `;
}

document.cookie = "myCookie=myValue; SameSite=None; Secure";
document.cookie = "myCookie=myValue; SameSite=Strict";
document.cookie = "myCookie=myValue; SameSite=Lax";