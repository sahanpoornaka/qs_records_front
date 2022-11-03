import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const INIT_DATA = {
    floorNo: 0,
    floorDescription: "",
    floorRemarks: "",
}

const AddLevelPage = () => {

    // Form Data
    const [formValues, setFormValues] = useState(INIT_DATA);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column" rowSpacing={3}>
                    <Grid item>
                            <FormControl>
                                <InputLabel id="projectName-select-label">Project Name</InputLabel>
                                <Select 
                                    labelId="projectName-select-label"
                                    defaultValue={"i2sneaz59tmn"} 
                                    name="projectId"
                                    value={
                                        formValues.projectId
                                    }
                                    onChange={handleInputChange}>
                                    <MenuItem key="projectId" value="i2sneaz59tmn">
                                        Test Project 1
                                    </MenuItem>
                                    <MenuItem key="projectId" value="i2sneaz59tmm">
                                        Test Project 2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField id="floorNo-input" name="floorNo" label="Floor Number" type="number"
                                value={
                                    formValues.floorNo
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="floorDescription-input" name="floorDescription" label="Floor Description" type="text" multiline rows={3}
                                value={
                                    formValues.floorDescription
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="floorRemarks-input" name="floorRemarks" label="Floor Remarks" type="text" multiline rows={3}
                                value={
                                    formValues.floorRemarks
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" type="submit" >Add Level</Button>

                        </Grid>
                    </Grid>
                </form>
            </Box>
    )
}

export default AddLevelPage;

