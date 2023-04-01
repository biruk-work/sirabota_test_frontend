import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogContent,
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    makeStyles,
} from '@material-ui/core'
import { EditOutlined, DeleteOutlineOutlined } from '@material-ui/icons'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    retrieveEmployees,
    updateEmployee,
    deleteEmployee,
} from '../actions/employee.action'

const useStyles = makeStyles({
    dialogRoot: {
        '& .MuiDialog-paper': {
            width: '40%',
            maxWidth: 'none',
        },
    },
})

const ListEmployees = (props: any) => {
    const [rows, setRows] = useState<any>([])
    const [open, setOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<
        | {
              _id: string
              name: string
              dateOfBirth: string
              gender: string
              salary: string
          }
        | any
    >({})
    const { employees } = props

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        console.log(employees)
        employees.length != 0 && setRows(employees)
    }, [employees])

    useEffect(() => {
        const func = async () => {
            await props.retrieveEmployees()
        }
        func()
    }, [])

    useEffect(() => {
        setFormData({
            name: selectedEmployee.name,
            dateOfBirth: selectedEmployee.dateOfBirth,
            gender: selectedEmployee.gender,
            salary: selectedEmployee.salary,
        })
    }, [selectedEmployee])

    const handleDeleteRow = (index: number) => {
        const newRows = [...rows]
        newRows.splice(index, 1)
        setRows(newRows)
    }

    const [formData, setFormData] = useState({
        name: null,
        dateOfBirth: null,
        gender: null,
        salary: null,
    })

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        await props.updateEmployee(selectedEmployee._id, formData)
        toast.success(`Employee updated successfully`)
    }

    const handleInputChange = (event: {
        target: { name: any; value: any }
    }) => {
        const { name, value } = event.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                classes={{ root: classes.dialogRoot }}
            >
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" style={{ marginTop: '15px' }}>
                            Update Employee
                        </Typography>
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name == null ? '' : formData.name}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            required
                        />
                        <br />
                        <br />
                        <TextField
                            name="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            value={
                                formData.dateOfBirth == null
                                    ? ''
                                    : formData.dateOfBirth
                            }
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '100%' }}
                            required
                        />
                        <br />
                        <br />
                        <FormControl
                            component="fieldset"
                            style={{ width: '100%' }}
                            required
                        >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={
                                    formData.gender == null
                                        ? ''
                                        : formData.gender
                                }
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
                            value={
                                formData.salary == null ? '' : formData.salary
                            }
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <span>$</span>,
                            }}
                            style={{ width: '100%' }}
                            required
                        />
                        <br />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ width: '100%' }}
                        >
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length != 0 &&
                            rows.map(
                                (
                                    row: {
                                        _id: string
                                        name: string
                                        dateOfBirth: string
                                        gender: string
                                        salary: string
                                    },
                                    index: number
                                ) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.dateOfBirth}</TableCell>
                                        <TableCell>{row.gender}</TableCell>
                                        <TableCell>{row.salary}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => {
                                                    handleOpen()
                                                    setSelectedEmployee(row)
                                                }}
                                            >
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton
                                                onClick={async () => {
                                                    handleDeleteRow(index)
                                                    await props.deleteEmployee(
                                                        row._id
                                                    )
                                                    toast.success(
                                                        `Employee #${index} deleted successfully`
                                                    )
                                                }}
                                            >
                                                <DeleteOutlineOutlined />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        employees: state.employees,
    }
}

export default connect(mapStateToProps, {
    retrieveEmployees,
    updateEmployee,
    deleteEmployee,
})(ListEmployees)
