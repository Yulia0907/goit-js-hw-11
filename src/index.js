// import {createGalleryMarkup} from './utils/markup';
// import ApiServise from './utils/apiService';
// import { lightbox } from './utils/lightbox';

// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';


// const refs = {
//     form: document.querySelector('.search-form'),
//     gallery: document.querySelector('.gallery'),
//     bntLoadMore: document.querySelector('.load-more'),
// };

// // const refs = {
// //     searchForm: document.querySelector('.search-form'),
// //     gallery: document.querySelector('.gallery'),  
// //     bntLoadMore: document.querySelector('.load-more'),   
// //   };
// //     const apiImageServise = new apiImageServise();   


// refs.form.addEventListener('submit', onFormSubmit);
// refs.bntLoadMore.addEventListener('click', handleLoadMore);
// const apiImageServise = new ApiServise();


// async function onFormSubmit(event) {
//     event.preventDefault();

//     const searchQuery = event.currentTarget.searchQuery.value.trim();

//     console.log(searchQuery);

//     apiImageServise.query = searchQuery;
//     apiImageServise.resetPage();
//     if (apiImageServise.query === '') {
//          Notify.warning('Please, fill the main field');  
//       return;
//      } 

//     const images = await apiImageServise.getImages();

//     refs.gallery.innerHTML = createGalleryMarkup(images);
//     lightbox.refresh();

//     refs.gallery.innerHTML = '';       

       
            
    
//     apiImageServise.agent
//      .then(data => {
//        refs.gallery.innerHTML = '';
//        refs.bntLoadMore.classList.remove('visually-hidden');  
  
//        data.totalPages = Math.ceil(data.totalHits / data.PER_PAGE);
   

//        if (!hits.totalHits) {        
//          Notify.warning(
//            `Sorry, there are no images matching your search query. Please try again.`,
//          );
//          refs.bntLoadMore.classList.add('visually-hidden');
//          return;
//        };  

//        onRenderGallery(data);

//        if (data.totalHits === data.totalPages) {       
//         refs.bntLoadMore.classList.add('visually-hidden');
//         apiImageServise.incrementPage();
//         Notiflix.info("We're sorry, but you've reached the end of search results.");
//       };

//         if (data.totalHits > 1) {     
//        Notify.success(`Hooray! We found ${data.totalHits} images !!!`);       ;
//       refs.bntLoadMore.classList.remove('visually-hidden');
        
//        // Бесконечного скролла 
// const options = {
//   rootMargin: '50px',
//   root: null,
//   threshold: 0.3
// };
// const observer = new IntersectionObserver(onLoadMore, options);
// observer.observe(refs.bntLoadMore);  
//         }      
//      }); 


// };


// async function handleLoadMore() {
//     apiImageServise.incrementPage();
//     const images = await apiImageServise.getImages(); 

//     refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
//     lightbox.refresh();




// }



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
  
  refs.searchForm.addEventListener('submit', onSearch);
  refs.bntLoadMore.addEventListener('click', onLoadMore);


      //////---- FUNCTION ----////
   function onSearch(e) {
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
       refs.bntLoadMore.classList.remove('visually-hidden');  
  
       data.totalPages = Math.ceil(data.totalHits / 40);
   

       if (!data.totalHits) {        
         Notify.failure(
           `Sorry, there are no images matching your search query. Please try again.`,
         );
         refs.bntLoadMore.classList.add('visually-hidden');
         return;
       };  

       onRenderGallery(data);

       if (!data.hits.length && data.totalHits) {       
        // apiImageServise.incrementPage();
        Notiflix.info("We're sorry, but you've reached the end of search results.");
        refs.bntLoadMore.classList.add('visually-hidden');
      };

        if (data.totalHits > 1) {     
       Notify.success(`Hooray! We found ${data.totalHits} images !!!`);       ;
      refs.bntLoadMore.classList.remove('visually-hidden');
        
       // Бесконечного скролла 
const options = {
  rootMargin: '50px',
  root: null,
  threshold: 0.3
};
const observer = new IntersectionObserver(onLoadMore, options);
observer.observe(refs.bntLoadMore);  
        }      
     });           
   }

   // ф-ция кнопки, которая добавляет картинки (onScrollmake)
   async function onLoadMore() {      
   apiImageServise.getImages().then(onScrollmake);
  }   
 // ф-ция рендерит массив (дата) картинок согласно разметки (createGalleryMarkup)
   function  onRenderGallery(data) {     
     const markup = data.hits.map(data => createGalleryMarkup(data)).join('');
          refs.gallery.insertAdjacentHTML('beforeend', markup);
          lightbox.refresh();      
   }   
  // ф-ция скролла для дальнейшего открытия картинок *более 40 шт)
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
  



