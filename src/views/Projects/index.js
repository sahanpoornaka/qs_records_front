import { Box, Button, Grid, TextField } from "@mui/material";
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
    projectName: "",
    projectDescription: "",
    projectRemarks: "",
    numFloors: "1"
}

const AddProjectPage = () => {

    // Form Data
    const [formValues, setFormValues] = useState(INIT_DATA);

    const handleSubmit = () => {

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
                            <TextField id="projectName-input" name="projectName" label="Project Name" type="text"
                                value={
                                    formValues.projectName
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="projectDescription-input" name="projectDescription" label="Project Description" type="text" multiline rows={3}
                                value={
                                    formValues.projectDescription
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="projectRemarks-input" name="projectRemarks" label="Project Remarks" type="text" multiline rows={3}
                                value={
                                    formValues.projectRemarks
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <TextField id="numFloors-input" name="numFloors" label="Number Of Floors" type="number"
                                value={
                                    formValues.numFloors
                                }
                                onChange={handleInputChange}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" type="submit" >Add Project</Button>

                        </Grid>
                    </Grid>
                </form>
            </Box>
    )
}

export default AddProjectPage;