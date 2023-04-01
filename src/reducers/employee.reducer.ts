import {
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
} from '../actions/types'

const initialState: any[] = []

const employeReducer = (_: any, action: { type: any; payload: any }) => {
    const { type, payload } = action

    let employees = initialState

    switch (type) {
        case CREATE_EMPLOYEE:
            return payload.employees

        case RETRIEVE_EMPLOYEES:
            return payload.employees

        case UPDATE_EMPLOYEE:
            return payload.employees

        case DELETE_EMPLOYEE:
            return employees.filter(({ id }) => id !== payload.id)

        default:
            return employees
    }
}

export default employeReducer
