export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  Search: undefined;
  SearchResults: {
    location?: string;
    guests: { adults: number; children: number; infants: number; pets: number };
    startDate?: string | null;
    endDate?: string | null;
    coords?: { latitude: number; longitude: number };
  };
  VillaDetail: { villa: any };
  BookingReview: { villa: any; dates: any; guests: any };
  MessageToHost: undefined;
  PaymentReview: undefined;
  ViewProfile: undefined;
  WishlistDetails: { wishlist: any };
};

export type BottomTabParamList = {
  Home: undefined;
  Saved: undefined;
  History: undefined;
  Profile: undefined;
};
