import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  images: string[];
  name?: string;
  subtitle?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
}

export interface Wishlist {
  name: string;
  items: WishlistItem[];
  thumbnail?: string;
}

interface WishlistState {
  wishlists: Wishlist[];
  lastUsedWishlistName: string | null;
  modalVisible: boolean;
  toastVisible: boolean;
  pendingProperty: WishlistItem | null;
}

const initialState: WishlistState = {
  wishlists: [],
  lastUsedWishlistName: null,
  modalVisible: false,
  toastVisible: false,
  pendingProperty: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    showWishlistModal: (state, action: PayloadAction<WishlistItem>) => {
      state.pendingProperty = action.payload;
      state.modalVisible = true;
    },
    hideWishlistModal: (state) => {
      state.modalVisible = false;
    },
    showWishlistToast: (state, action: PayloadAction<string>) => {
      state.lastUsedWishlistName = action.payload;
      state.toastVisible = true;
    },
    hideWishlistToast: (state) => {
      state.toastVisible = false;
    },
    createWishlist: (state, action: PayloadAction<{ name: string }>) => {
      if (state.pendingProperty) {
        state.wishlists.push({
          name: action.payload.name,
          items: [state.pendingProperty],
          thumbnail: state.pendingProperty.images[0],
        });
        state.lastUsedWishlistName = action.payload.name;
        state.modalVisible = false;
        state.toastVisible = true;
      }
    },
    togglePropertyInWishlist: (state, action: PayloadAction<{ wishlistName: string, property: WishlistItem }>) => {
      const wishlist = state.wishlists.find(w => w.name === action.payload.wishlistName);
      if (wishlist) {
        const index = wishlist.items.findIndex(i => i.id === action.payload.property.id);
        if (index === -1) {
          wishlist.items.push(action.payload.property);
        } else {
          wishlist.items.splice(index, 1);
        }
      }
    },
    saveToExistingWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const targetName = state.lastUsedWishlistName || (state.wishlists.length > 0 ? state.wishlists[0].name : null);
      if (targetName) {
        const wishlist = state.wishlists.find(w => w.name === targetName);
        if (wishlist && !wishlist.items.find(i => i.id === action.payload.id)) {
          wishlist.items.push(action.payload);
          state.pendingProperty = action.payload;
          state.toastVisible = true;
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlists.forEach(wishlist => {
        wishlist.items = wishlist.items.filter(item => item.id !== action.payload);
      });
    }
  },
});

export const {
  showWishlistModal,
  hideWishlistModal,
  showWishlistToast,
  hideWishlistToast,
  createWishlist,
  saveToExistingWishlist,
  togglePropertyInWishlist,
  removeFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
