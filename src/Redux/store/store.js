// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage
import userReducer from '../userSlice/userSlice'; // Import your user reducer

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure the Redux store
const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    // Default middleware setup
});

const persistor = persistStore(store);

export { store, persistor };
