import {createGalleryMarkup} from './utils/markup';
import ApiServise from './utils/apiService';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';


const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    bntLoadMore: document.querySelector('.load-more'),
};

// bntLoadMore.style.display = 'none';

refs.form.addEventListener('submit', onFormSubmit);
refs.bntLoadMore.addEventListener('click', handleLoadMore);
const apiImageServise = new ApiServise();
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
// let lightbox = new SimpleLightbox('.gallery a', { 
//     captions: true,
//     captionsData: 'alt',
//     captionDelay: 250, 
//     });

// console.log(lightbox);

console.log(gallerySimpleLightbox);

async function onFormSubmit(event) {
    event.preventDefault();

    const searchQuery = event.currentTarget.elements.searchQuery.value;

    console.log(searchQuery);

    apiImageServise.query = searchQuery;
    apiImageServise.page = 1;

    const images = await apiImageServise.getImages();

    refs.gallery.innerHTML = createGalleryMarkup(images);

    gallerySimpleLightbox.refresh();

    

    // lightbox.refresh();
};


async function handleLoadMore() {
    apiImageServise.incrementPage();
    const images = await apiImageServise.getImages(); 

    refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));

    // lightbox.refresh();

}



// function cleanGallery() {
//     gallery.innerHTML = '';
//     pageNumber = 1;
//     btnLoadMore.style.display = 'none';
//   }