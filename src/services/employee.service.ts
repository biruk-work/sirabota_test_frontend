import http from '../http-common'

class EmployeeService {
    create(employee: {
        name: string
        dateOfBirth: string
        gender: string
        salary: string
    }) {
        return http.post('/create-employee', employee)
    }

    getAll() {
        return http.get('/get-employees')
    }

    update(
        id: string,
        employee: {
            name: string
            dateOfBirth: string
            gender: string
            salary: string
        }
    ) {
        return http.put(`/update-employee/${id}`, employee)
    }

    delete(id: string) {
        return http.delete(`/delete-employee/${id}`)
    }
}

export default new EmployeeService()
