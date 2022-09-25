import axios from 'axios';

export default class ApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;  
      this.PER_PAGE = 40;
      this.totalHits = 0;
      this.totalPages = 0;
      this.endOfHits = false;
      
    }
    async getImages() {
      const axiosOptions = {
        method: 'get',
        url: 'https://pixabay.com/api/',
        params: {
          key: '30158154-b75a98e868b38445873354c76',
          q: `${this.searchQuery}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: `${this.page}`,
          per_page: `${this.PER_PAGE}`,     
      }
    };
    try {
      const response = await axios(axiosOptions);

      const data = response.data;
   
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }   
  
    incrementPage() {
      this.page += 1;
    }
  
    resetPage() {
      this.page = 1;
    }

    resetEndOfHits() {
      this.endOfHits = false;
    }  
    
  
    get query() {
      return this.searchQuery;
    }
  
    set query(newQuery) {
      this.searchQuery = newQuery;
    } 
  }

