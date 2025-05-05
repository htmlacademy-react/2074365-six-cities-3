import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {
  AppThunkDispatch,
  createThunkExtraArg,
  extractActionsTypes,
  generateMockComment,
  generateMockOffer
} from '@/store/mock.ts';
import {Action} from 'redux';
import {State} from '@/types/state';
import {ApiEndpoints, CITIES, NameSpace, SortType} from '@/constants/constants.ts';
import {
  addCommentAction,
  checkAuthAction,
  fetchCommentsAction,
  fetchFavoritesAction,
  fetchFavoritesStatusAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  logoutAction
} from '@/store/api-actions.ts';
import thunk from 'redux-thunk';
import {RequestStatus} from '@/types/user.ts';


describe('Async actions', () => {
  const extra = createThunkExtraArg();
  const mockAxiosAdapter = new MockAdapter(extra.api);
  const middleware = [thunk.withExtraArgument(extra)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Main]: {
        city: CITIES[0],
        sorting: SortType.Popular,
        offers: [],
        favorites: [],
        isDataLoading: false,
        offersLoadingStatus: RequestStatus.Idle,
        error: null
      },
      [NameSpace.Offer]: {
        currentOffer: null,
        nearestOffers: [],
        isDataLoading: false,
        isNearestLoading: false,
        error: null
      },
      [NameSpace.Comments]: {
        comments: [],
        countComments: 0,
        isCommentsLoading: false,
        isReviewLoading: false,
        error: null
      },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch checkAuthAction correctly', async () => {
      const mockOffers = Array.from({length: 5}, generateMockOffer);
      const mockFavorites = mockOffers.filter((offer) => offer.isFavorite);
      mockAxiosAdapter.onGet(ApiEndpoints.LOGIN).reply(200, mockFavorites);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should handle checkAuthAction failure', async () => {
      mockAxiosAdapter.onGet(ApiEndpoints.LOGIN).reply(400);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch fetchOffersAction correctly', async () => {
      const mockOffers = Array.from({length: 5}, generateMockOffer);
      mockAxiosAdapter.onGet(ApiEndpoints.OFFERS).reply(200, mockOffers);
      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);

    });

    it('should dispatch fetchOffersAction failure', async () => {
      mockAxiosAdapter.onGet(ApiEndpoints.OFFERS).reply(400);
      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });

  });

  describe('fetchOfferAction', () => {
    it('should dispatch fetchOfferAction correctly', async () => {
      const mockOffer = generateMockOffer();
      mockAxiosAdapter.onGet(ApiEndpoints.OFFER.replace(':offerId', '1')).reply(200, mockOffer);
      await store.dispatch(fetchOfferAction('1'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should handle fetchOfferAction failure', async () => {
      mockAxiosAdapter.onGet(ApiEndpoints.OFFER.replace(':offerId', '1')).reply(400);
      await store.dispatch(fetchOfferAction('1'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });

  });

  describe('fetchOfferAction', () => {
    it('should dispatch fetchNearbyOffersAction correctly', async () => {
      const mockNearest = Array.from({length: 3}, generateMockOffer);
      mockAxiosAdapter.onGet(ApiEndpoints.NEARBY.replace(':offerId', '1')).reply(200, mockNearest);
      await store.dispatch(fetchNearbyOffersAction('1'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockNearest);
    });

    it('should handle fetchNearbyOffersAction failure', async () => {
      mockAxiosAdapter.onGet(ApiEndpoints.NEARBY.replace(':offerId', '1')).reply(400);
      await store.dispatch(fetchNearbyOffersAction('1'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });

  });

  it('should dispatch logoutAction correctly', async () => {
    mockAxiosAdapter.onDelete(ApiEndpoints.LOGOUT).reply(204);
    await store.dispatch(logoutAction());
    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContain(logoutAction.pending.type);
    expect(actions).toContain(logoutAction.fulfilled.type);
  });

  describe('fetchCommentsAction', () => {

    it('should dispatch fetchCommentsAction correctly', async () => {
      const mockComments = Array.from({length: 5}, generateMockComment);
      const sortedMockComments = [...mockComments].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      mockAxiosAdapter.onGet(ApiEndpoints.COMMENTS.replace(':offerId', '1')).reply(200, mockComments);
      await store.dispatch(fetchCommentsAction('1'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload).toEqual(sortedMockComments);
    });

    it('should handle fetchCommentsAction failure', async () => {
      mockAxiosAdapter.onGet(ApiEndpoints.COMMENTS.replace(':offerId', '1')).reply(400);
      await store.dispatch(fetchCommentsAction('1'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });
  describe('fetchFavoritesStatusAction', () => {

    it('should dispatch fetchFavoritesStatusAction correctly', async () => {
      mockAxiosAdapter.onPost(ApiEndpoints.FAVORITE_STATUS.replace(':offerId', '1').replace(':status', '1')).reply(200, {});
      await store.dispatch(fetchFavoritesStatusAction({offerId: '1', isFavorite: true}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavoritesStatusAction.pending.type,
        fetchFavoritesStatusAction.fulfilled.type,
      ]);
    });

    it('should handle fetchFavoritesStatusAction failure', async () => {
      mockAxiosAdapter.onPost(ApiEndpoints.FAVORITE_STATUS.replace(':offerId', '1').replace(':status', '1')).reply(400);
      await store.dispatch(fetchFavoritesStatusAction({offerId: '1', isFavorite: true}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavoritesStatusAction.pending.type,
        fetchFavoritesStatusAction.rejected.type,
      ]);
    });
  });

  describe('addCommentAction', () => {

    it('should dispatch addCommentAction correctly', async () => {
      mockAxiosAdapter.onPost(ApiEndpoints.COMMENTS.replace(':offerId', '1')).reply(200, {});
      await store.dispatch(addCommentAction({offerId: '1', comment: 'Nice place!', rating: 5}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.fulfilled.type,
      ]);
    });

    it('should handle addCommentAction failure', async () => {

      mockAxiosAdapter.onPost(ApiEndpoints.COMMENTS.replace(':offerId', '1')).reply(400);
      await store.dispatch(addCommentAction({offerId: '1', comment: 'Nice place!', rating: 5}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type,
      ]);
    });
  });
});
