import { useState } from 'react'
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    Button,
    FormControlLabel,
    Radio,
    Typography,
} from '@material-ui/core'

import { createEmployee } from '../actions/employee.action'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

const AddEmployee = (props: any) => {
    const [formData, setFormData] = useState({
        name: null,
        dateOfBirth: null,
        gender: null,
        salary: null,
    })

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        await props.createEmployee(formData)
        toast.success(`Employee added successfully`)
    }

    const handleInputChange = (event: {
        target: { name: any; value: any }
    }) => {
        const { name, value } = event.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }
    return (
        <center>
            <form onSubmit={handleSubmit}>
                <Typography variant="h5" style={{ marginTop: '15px' }}>
                    Add Employee
                </Typography>
                <TextField
                    name="name"
                    label="Name"
                    value={formData.name == null ? '' : formData.name}
                    onChange={handleInputChange}
                    style={{ width: '30%' }}
                    required
                />
                <br />
                <br />
                <TextField
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={
                        formData.dateOfBirth == null ? '' : formData.dateOfBirth
                    }
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: '30%' }}
                    required
                />
                <br />
                <br />
                <FormControl
                    component="fieldset"
                    style={{ width: '30%' }}
                    required
                >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                    </RadioGroup>
                </FormControl>
                <br />
                <TextField
                    name="salary"
                    label="Salary"
                    type="number"
                    value={formData.salary == null ? '' : formData.salary}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <span>$</span>,
                    }}
                    style={{ width: '30%' }}
                    required
                />
                <br />
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ width: '30%' }}
                >
                    Submit
                </Button>
            </form>
        </center>
    )
}

export default connect(
    () => {
        return {}
    },
    {
        createEmployee,
    }
)(AddEmployee)
