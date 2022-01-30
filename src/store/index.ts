import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import employeesReducer from './employess-slice';
const store = configureStore({
    reducer: { auth: authReducer.reducer, employees: employeesReducer.reducer}
})
export default store;