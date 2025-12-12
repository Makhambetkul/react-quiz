import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const LOCAL_KEY = "favorites";


function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLocal(items) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}

function mergeArrays(localItems, serverItems) {
  const combined = [...localItems];
  serverItems.forEach((item) => {
    if (!combined.some((x) => x.id === item.id)) {
      combined.push(item);
    }
  });
  return combined;
}


export const loadFavorites = createAsyncThunk("favorites/load", async (user) => {
  if (!user) {
    return loadLocal();
  }

  const ref = doc(db, "favorites", user.uid);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data().items || [] : [];
});


export const mergeFavoritesOnLogin = createAsyncThunk(
  "favorites/mergeOnLogin",
  async (user) => {
    const ref = doc(db, "favorites", user.uid);

    const localFavs = loadLocal();
    const snap = await getDoc(ref);
    const serverFavs = snap.exists() ? snap.data().items || [] : [];

    const merged = mergeArrays(localFavs, serverFavs);

    await setDoc(ref, { items: merged });
    localStorage.removeItem(LOCAL_KEY);


    return merged;
  }
);


export const saveFavoritesToFirestore = createAsyncThunk(
  "favorites/saveToFirestore",
  async ({ user, items }) => {
    if (!user) return;

    const ref = doc(db, "favorites", user.uid);
    await setDoc(ref, { items });

    return items;
  }
);



const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },

  reducers: {
    toggleFavoriteLocal(state, action) {
      const item = action.payload;
      const exists = state.items.some((x) => x.id === item.id);

      if (exists) {
        state.items = state.items.filter((x) => x.id !== item.id);
      } else {
        state.items.push(item);
      }
      saveLocal(state.items);
    },

    setFavorites(state, action) {
      state.items = action.payload;
    },

    clearFavorites(state) {
      state.items = [];
      localStorage.removeItem(LOCAL_KEY);
    },
  },

  extraReducers: (builder) => {
  builder
    .addCase(loadFavorites.fulfilled, (state, action) => {
      state.items = action.payload;
    })
    .addCase(mergeFavoritesOnLogin.fulfilled, (state, action) => {
      state.items = action.payload;
    })
    .addCase(saveFavoritesToFirestore.fulfilled, () => {
    });
},

});

export const { toggleFavoriteLocal, setFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;