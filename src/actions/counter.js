import { INCREMENT, DECREMENT } from '../types/counter';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
