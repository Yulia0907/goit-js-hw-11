import {createGalleryMarkup} from './utils/markup';
import ApiServise from './utils/apiService';
import { lightbox } from './utils/lightbox';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const simpleLigthbox = new SimpleLightbox('.gallery a', {
    nav: true,
    close: true,
    caption: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    bntLoadMore: document.querySelector('.load-more'),
};


refs.form.addEventListener('submit', onFormSubmit);
refs.bntLoadMore.addEventListener('click', handleLoadMore);
const apiImageServise = new ApiServise();


async function onFormSubmit(event) {
    event.preventDefault();

    const searchQuery = event.currentTarget.searchQuery.value;

    console.log(searchQuery);

    apiImageServise.query = searchQuery;
    apiImageServise.page = 1;

    const images = await apiImageServise.getImages();

    refs.gallery.innerHTML = createGalleryMarkup(images);
    lightbox.refresh();


};


async function handleLoadMore() {
    apiImageServise.incrementPage();
    const images = await apiImageServise.getImages(); 

    refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
    lightbox.refresh();




}