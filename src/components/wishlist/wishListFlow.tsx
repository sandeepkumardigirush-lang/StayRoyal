import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  hideWishlistModal,
  hideWishlistToast,
  createWishlist,
  showWishlistModal
} from '../../redux/wishlistSlice';
import { WishlistModal, WishlistToast } from './wishListModal';

const WishlistFlow = () => {
  const dispatch = useDispatch();
  const {
    modalVisible,
    toastVisible,
    pendingProperty,
    lastUsedWishlistName
  } = useSelector((state: RootState) => state.wishlist);

  const handleCreate = (name: string) => {
    dispatch(createWishlist({ name }));
  };

  const handleCloseModal = () => {
    dispatch(hideWishlistModal());
  };

  const handleHideToast = () => {
    dispatch(hideWishlistToast());
  };

  const handleChange = () => {
    dispatch(hideWishlistToast());
    if (pendingProperty) {
      dispatch(showWishlistModal(pendingProperty));
    }
  };

  return (
    <>
      <WishlistModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onCreate={handleCreate}
      />
      {pendingProperty && (
        <WishlistToast
          visible={toastVisible}
          image={pendingProperty.image}
          wishlistName={lastUsedWishlistName || ''}
          onHide={handleHideToast}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default WishlistFlow;
