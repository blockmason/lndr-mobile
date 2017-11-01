import { UPDATE_FRIENDS, UPDATE_PENDING, UPDATE_DEBT } from '../types/friends';

//Given an update from respective UI update the state
export const updateFriends = (data) => ({ type: UPDATE_FRIENDS, data: data });
export const updatePending = (data) => ({ type: UPDATE_PENDING, data: data });
export const updateDebts = (data) => ({ type: UPDATE_DEBT, data: data });
