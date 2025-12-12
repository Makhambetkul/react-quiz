import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavoriteLocal,
  saveFavoritesToFirestore,
} from "../store/favoritesSlice";
import { useAuth } from "../context/AuthContext";

export default function useFavorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const { user } = useAuth();

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const toggle = (quiz) => {

    dispatch(toggleFavoriteLocal(quiz));


    if (user) {
      dispatch(
        saveFavoritesToFirestore({
          user,
          items: [...favorites, quiz], 
        })
      );
    }
  };

  return {
    favorites,
    isFavorite,
    toggle,
  };
}
