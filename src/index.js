import ApiService from './utils/apiService';
import createGalleryMarkup from './utils/markup';
import { lightbox } from './utils/lightbox';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),  
  bntLoadMore: document.querySelector('.load-more'),   
};
  const apiImageServise = new ApiService();   
  
  refs.searchForm.addEventListener('submit', onFormSubmit);
  refs.bntLoadMore.addEventListener('click', handleLoadMore);

function onFormSubmit(e) {
  e.preventDefault(); 

   refs.gallery.innerHTML = '';       
  apiImageServise.query = e.currentTarget.elements.searchQuery.value.trim();
  apiImageServise.resetPage();   
  if (apiImageServise.query === '') {
      Notify.warning('Please, fill the main field');  
      return;
  }        
 
  apiImageServise.getImages()   
  .then(data => {
    refs.gallery.innerHTML = '';
    refs.bntLoadMore.classList.remove('.visually-hidden');  

    data.totalPages = Math.ceil(data.totalHits / data.PER_PAGE);

    if (!data.totalHits) {        
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`,
      );
      refs.bntLoadMore.classList.add('.visually-hidden');
      return;
    };  

    onRenderGallery(data);

    if (data.hits.length < data.totalHits) {       
     apiImageServise.incrementPage();
     Notify.failure(`We're sorry, but you've reached the end of search results.`);
    //  refs.bntLoadMore.classList.add('visually-hidden');
   };

     if (data.totalHits > 0) {     
    Notify.success(`Hooray! We found ${data.totalHits} images !!!`);
     
     
    // Бесконечного скролла 
const options = {
rootMargin: '50px',
root: null,
threshold: 0.3,
};
const observer = new IntersectionObserver(handleLoadMore, options);
observer.observe(refs.bntLoadMore);  
     } 
     refs.bntLoadMore.classList.remove('visually-hidden');      
  }); 
          
}

   async function handleLoadMore() {      
       apiImageServise.getImages().then(onScrollmake);   
  }   

   function  onRenderGallery(data) {     
     const markup = data.hits.map(data => createGalleryMarkup(data)).join('');
          refs.gallery.insertAdjacentHTML('beforeend', markup);
          lightbox.refresh();      
   };

  function onScrollmake(data) {
   onRenderGallery(data); 
   lightbox.refresh(); 
   const { height: cardHeight } = document
     .querySelector(".gallery")
     .firstElementChild.getBoundingClientRect();   
   window.scrollBy({
     top: cardHeight * 2,
     behavior: "smooth",
   });   
  }
  



