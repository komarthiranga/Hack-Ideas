import { createSlice } from '@reduxjs/toolkit';
const initialState = {authenticated: false, employee: {}}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate(state, data: any){
          const employeeIndex = data.payload.employees.payload.findIndex( (employee: any) => employee.id ===  data.payload.employeeId);
          if(employeeIndex > -1) {
            state.authenticated = true;
            state.employee = data.payload.employees.payload[employeeIndex];
          }
          //state.authenticated = true;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;