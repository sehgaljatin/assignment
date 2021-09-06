import { call, put, takeEvery } from "redux-saga/effects";
import getProducts from "../services/Api";

function* fetchApiData() {
  try {
    const { data } = yield call(getProducts);
    yield put({ type: "FETCH_DATA_FULFILLED", data: data?.products });
  } catch (e) {
    yield put({ type: "FETCH_DATA_REJECTED", message: e.message });
  }
}

function* mySaga() {
  yield takeEvery("FETCH_DATA_PENDING", fetchApiData);
}
export default mySaga;
