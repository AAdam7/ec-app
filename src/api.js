export async function searchProducts(url) {
  const response = await fetch(url + `?limit=100`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
}
