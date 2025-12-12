import useFavorites from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const navigate = useNavigate();

  const { favorites, toggle } = useFavorites();

  return (
    <div className="favorites-page">
      <h1>⭐ Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((item) => (
            <li key={item.id} className="favorite-item">
              <span className="favorite-title">{item.title}</span>

              <div className="favorite-actions">
               
                <button
                  className="details-button"
                  onClick={() => navigate(`/quizzes/${item.id}/details`)}
                >
                  Details
                </button>

                <button
                  className="remove-button"
                  onClick={() => toggle(item)}
                >
                  ❌ Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
