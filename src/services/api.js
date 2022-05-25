export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const fetchApi = await fetch(url);
  const response = await fetchApi.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlBase = 'https://api.mercadolibre.com/sites/MLB/search?';
  let url = '';
  if (categoryId && query) {
    url = `${urlBase}category=${categoryId}&q=${query}`;
  } else if (categoryId && !query) {
    url = `${urlBase}category=${categoryId}`;
  } else {
    url = `${urlBase}q=${query}`;
  }
  const fetchApi = await fetch(url);
  const response = await fetchApi.json();
  return response;
}
