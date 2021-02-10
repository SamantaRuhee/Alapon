const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=e874a33aba5f4c24a2939d93df037f6d";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
