import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'tasks'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefault =>
    getDefault({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default { store, persistor };
