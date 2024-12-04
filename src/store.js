// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import channelReducer from './features/channel/channelSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    channel:channelReducer
  },
});

export default store;
