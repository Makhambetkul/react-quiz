const FAVORITES_KEY = "favoriteQuizzes";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function isFavorite(id) {
  const favs = getFavorites();
  return favs.some((quiz) => quiz.id === id);
}

export function toggleFavorite(quiz) {
  let favs = getFavorites();

  if (isFavorite(quiz.id)) {
    favs = favs.filter((q) => q.id !== quiz.id);
  } else {
    favs.push(quiz);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
}
