import { ActionType } from "../actions/config";

const initialState = {
  loading: false,
  data: [],
  error: null, 
  genderData: [],
  categoryData:[],
  brandData:[]
};

export const reducerProducts = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_DATA_PENDING:
      return {
        ...state,
        loading: true,
      };

    case ActionType.FETCH_DATA_FULFILLED:        
        var genderArr = []; var brandArr=[];var categoryArr=[];
        action?.data.forEach((elem) => {
          genderArr.push(elem.gender);
        });
        const genFinal = [...new Set(genderArr)];
        
        action?.data.forEach((elem) => {
            categoryArr.push(elem.category);
        });
        const categoryFinal = [...new Set(categoryArr)];
        
        action?.data.forEach((elem) => {
            brandArr.push(elem.brand);
        });
        const brandFinal = [...new Set(brandArr)];
      return {
        ...state,
        loading: false,
        data: action.data,
        error: " ",
        genderData:genFinal,
        categoryData:categoryFinal,
        brandData:brandFinal
      };

    case ActionType.FETCH_DATA_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case ActionType.FILTER_PRODUCTS_DATA:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: " ",
        genderData: []
      };

    default:
      return state;
  }
};
