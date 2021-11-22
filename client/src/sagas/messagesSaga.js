import { put } from 'redux-saga/effects'; 

import * as MessagesActionCreators from './../actions/messagesActionCreators';
import * as API from '../api';

export function * createMessageSaga(action) {
  try {
    const {data: message} = yield API.createMessage(action.payload.message);

    yield put(MessagesActionCreators.getMessagesSuccess(message));
  } catch (error) {
    yield put(MessagesActionCreators.getMessagesSuccess(error));
  }
}

export function * getMessagesSaga(action) {
  try {
    const {data: message} = yield API.getMessages();

    yield put(MessagesActionCreators.getMessagesSuccess(message));
  } catch (error) {
    yield put(MessagesActionCreators.getMessagesSuccess(error));
  }
}
