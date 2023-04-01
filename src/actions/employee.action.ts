import {
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
} from './types'

import EmployeeService from '../services/employee.service'

export const createEmployee =
    (employee: {
        name: string
        dateOfBirth: string
        gender: string
        salary: string
    }) =>
    async (dispatch: (arg0: { type: any; payload: any }) => void) => {
        try {
            const res = await EmployeeService.create(employee)

            res.data.statusCode == 200 &&
                dispatch({
                    type: CREATE_EMPLOYEE,
                    payload: res.data,
                })

            return Promise.resolve(res.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }

export const retrieveEmployees =
    () => async (dispatch: (arg0: { type: any; payload: any }) => void) => {
        try {
            const res = await EmployeeService.getAll()

            dispatch({
                type: RETRIEVE_EMPLOYEES,
                payload: res.data,
            })

            return res.data
        } catch (err) {
            console.log(err)
        }
    }

export const updateEmployee =
    (
        id: string,
        employee: {
            _id: string
            name: string
            dateOfBirth: string
            gender: string
            salary: string
        }
    ) =>
    async (
        dispatch: (arg0: {
            type: string
            payload: {
                _id: string
                name: string
                dateOfBirth: string
                gender: string
                salary: string
            }
        }) => void
    ) => {
        try {
            const res = await EmployeeService.update(id, employee)

            res.data.statusCode == 200 &&
                dispatch({
                    type: UPDATE_EMPLOYEE,
                    payload: res.data,
                })

            return Promise.resolve(res.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }

export const deleteEmployee =
    (id: string) =>
    async (
        dispatch: (arg0: { type: any; payload: { id: string } }) => void
    ) => {
        try {
            await EmployeeService.delete(id)

            dispatch({
                type: DELETE_EMPLOYEE,
                payload: { id },
            })
        } catch (err) {
            console.log(err)
        }
    }
