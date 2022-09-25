import axios from "axios";

const agent = axios.create({
    baseURL: 'https://pixabay.com/api',
    params: {
        key: '30158154-b75a98e868b38445873354c76',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
    },  
});

export default class ApiServise {
    constructor(searchQuery, page) {
        this.searchQuery = '';
        this.page = 1;
    }

    async getImages() {
    const {
        data: {hits}
    } = await agent.get(`?q=${this.searchQuery}&page=${this.page}`);
            return hits;
    }

    get query() {
    return this.searchQuery;
    }
    set query(newseachQuery) {
    this.searchQuery = newseachQuery;
    }

   incrementPage(){
    this.page += 1;
   }
};

