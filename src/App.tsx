import { ToastContainer } from 'react-toastify'

import AddEmployee from './components/AddEmployee'
import ListEmployees from './components/ListEmployees'

const App = () => {
    return (
        <>
            <AddEmployee></AddEmployee>
            <ListEmployees></ListEmployees>
            <ToastContainer />
        </>
    )
}

export default App
