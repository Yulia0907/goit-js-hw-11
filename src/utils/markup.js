export function createGalleryMarkup(images) {
    return images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <a href:"${largeImageURL}">
  <img  class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> <span class="info-item-span">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b> <span class="info-item-span">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b> <span class="info-item-span">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b> <span class="info-item-span">${downloads}</span>
    </p>
  </div>
  </a>
</div>`;
    }
    ).join('');
};
