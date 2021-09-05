import { ActionType } from './config';
export const getProductsData = (data) => {
    return {
        type: ActionType.FETCH_DATA_PENDING,
        payload: data,
    }
};
export const successProductsData = (data) => {
    return {
        type: ActionType.FETCH_DATA_FULFILLED,
        payload: data,
    }
};
export const failedProductsData = (error) => {
    return { 
        type: ActionType.FETCH_DATA_REJECTED,
        payload: error,
    }
};
export const filterProductsData = (data) => {
    return {
        type: ActionType.FILTER_PRODUCTS_DATA,
        payload: data,
    }
};