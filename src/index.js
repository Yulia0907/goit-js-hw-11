const refs = {
    form: document.querySelector('.search-form'),
};

console.log(refs.form);

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit (event) {
    event.preventDefult();

    const searchQuery = event.currentTarget.searchQuery.value;

    console.log(searchQuery);
};

