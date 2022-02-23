import {
  GENDER,
  OCCASSION,
  CARDS,
  BUDGET,
  AGEGROUP,
  OCCASSIONLIST,
  PERSONALITYLIST,
  AGELIST,
  CART,
  SORTMODAL,
  FILTERMODAL,
  PRODUCTS,
  INFLUENCER,
} from '../actions/shopActions';

const defaultState = {
  gender: null,
  occassion: null,
  budget: null,
  cards: null,
  ageGroup: null,
  occassionList: [],
  personalityList: [],
  defaultAgeList: [
    {
      id: '1',
      description: 'Select Age Group',
    },
  ],
  ageList: [],
  cartData: [],
  sortVisible: false,
  filterVisible: false,
  shareModal: false,
  products: [],
  influencers: [],
};

export const shopReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GENDER:
      return {...state, gender: action.payload};
    case CARDS:
      return {...state, cards: action.payload};
    case BUDGET:
      return {...state, budget: action.payload};
    case OCCASSION:
      return {...state, occassion: action.payload};
    case AGEGROUP:
      return {...state, ageGroup: action.payload};
    case OCCASSIONLIST:
      return {...state, occassionList: action.payload};
    case CART:
      return {...state, cartData: [action.payload]};
    case SORTMODAL:
      return {...state, sortVisible: action.payload};
    case FILTERMODAL:
      return {...state, filterVisible: action.payload};
    case PERSONALITYLIST:
      return {...state, personalityList: action.payload};
    case AGELIST:
      return {
        ...state,
        ageList: [...state.defaultAgeList, ...action.payload],
      };
    case PRODUCTS:
      return {...state, products: action.payload};
    case INFLUENCER:
      return {...state, influencers: action.payload};
    default:
      return {
        ...state,
      };
  }
};
