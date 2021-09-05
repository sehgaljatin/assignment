import {all} from 'redux-saga/effects';
import mySaga from './config';

export default function* rootSaga() {
    yield all([
        mySaga(),
    ])
}