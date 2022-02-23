export const OCCASSION = 'OCCASSION';
export const CARDS = 'CARDS';
export const GENDER = 'GENDER';
export const BUDGET = 'BUDGET';
export const AGEGROUP = 'AGEGROUP';
export const OCCASSIONLIST = 'OCCASSIONLIST';
export const PERSONALITYLIST = 'PERSONALITYLIST';
export const AGELIST = 'AGELIST';
export const CART = 'CART';
export const SORTMODAL = 'SORTMODAL';
export const FILTERMODAL = 'FILTERMODAL';
export const PRODUCTS = 'PRODUCTS';
export const INFLUENCER = 'INFLUENCER';
export const CATEGORYLIST = 'CATEGORYLIST';

export const getOccassion = occassion => {
  return {
    type: OCCASSION,
    payload: occassion,
  };
};
export const getInfluencers = influencer => {
  return {
    type: INFLUENCER,
    payload: influencer,
  };
};
export const getProducts = products => {
  return {
    type: PRODUCTS,
    payload: products,
  };
};

export const sortModal = val => {
  return {
    type: SORTMODAL,
    payload: val,
  };
};
export const filterModal = val => {
  return {
    type: FILTERMODAL,
    payload: val,
  };
};

export const getCards = cards => {
  return {
    type: CARDS,
    payload: cards,
  };
};

export const getGender = gender => {
  return {
    type: GENDER,
    payload: gender,
  };
};

export const getGroup = ageGroup => {
  return {
    type: AGEGROUP,
    payload: ageGroup,
  };
};

export const getBudget = budget => {
  return {
    type: BUDGET,
    payload: budget,
  };
};

export const getOccassionListFromApi = response => {
  return {
    type: OCCASSIONLIST,
    payload: response,
  };
};

export const getPersonalityListfromApi = response => {
  return {
    type: PERSONALITYLIST,
    payload: response,
  };
};

export const getCatergoryListfromApi = response => {
  return {
    type: CATEGORYLIST,
    payload: response,
  };
};
export const getAgeListfromApi = response => {
  return {
    type: AGELIST,
    payload: response,
  };
};
export const updateCart = response => {
  return {
    type: CART,
    payload: response,
  };
};
