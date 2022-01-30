import { createSlice } from '@reduxjs/toolkit';
const initialState = {employees: []}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        getEmployees(state, data: any) {
            state.employees = data;
        }
    }
});

const fetchEmployees = async(dispatch: any) => {
    const response = await fetch('https://react-http-1d553-default-rtdb.firebaseio.com/Employee.json');
    if(!response.ok) {
        throw new Error('Unable to fetch the users');
    }
    const data = await response.json();
    dispatch(employeesSlice.actions.getEmployees(data));
}

export const getEmployees = () => {
    return (dispatch: any) => {
        try {
            fetchEmployees(dispatch);
        } catch(e) {
            throw new Error('Something went wrong...');
        }    
    }
}
export const employeesActions = employeesSlice.actions;
export default employeesSlice;