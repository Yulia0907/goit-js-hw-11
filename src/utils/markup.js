export default function createGalleryMarkup(data) {
  return `<div class="photo-card">
  <a href="${data.largeImageURL}">
    <img class="photo" src="${data.webformatURL}" alt="${data.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="info-item-span">${data.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="info-item-span">${data.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="info-item-span">${data.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="info-item-span">${data.downloads}</span>
    </p>
  </div>
  </a>
  </div>`;
};