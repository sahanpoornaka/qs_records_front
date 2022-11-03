import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";

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
}

const AddElementPage = () => { // Form Data
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
                <Grid container alignItems="center" justify="center" direction="column"
                    rowSpacing={3}>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="projectName-select-label">Project Name</InputLabel>
                            <Select labelId="projectName-select-label"
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
                        <FormControl>
                            <InputLabel id="floorNo-select-label">Floor No</InputLabel>
                            <Select labelId="floorNo-select-label"
                                defaultValue={"0"}
                                name="floorNo"
                                value={
                                    formValues.floorNo
                                }
                                onChange={handleInputChange}>
                                <MenuItem key="floorNo" value="0">
                                    Ground Floor
                                </MenuItem>
                                <MenuItem key="floorNo" value="1">
                                    1st Floor
                                </MenuItem>
                                <MenuItem key="floorNo" value="2">
                                    2nd Floor
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="elementName-select-label">Element Name</InputLabel>
                            <Select labelId="elementName-select-label"
                                defaultValue={"EL001"}
                                name="elementName"
                                value={
                                    formValues.elementName
                                }
                                onChange={handleInputChange}>
                                <MenuItem key="elementName" value="EL001">
                                    Floor
                                </MenuItem>
                                <MenuItem key="elementName" value="EL002">
                                    Wall
                                </MenuItem>
                                <MenuItem key="elementName" value="EL003">
                                    Door
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="elementDescription-input" name="elementDescription" label="Element Description" type="text" multiline
                            rows={3}
                            value={
                                formValues.elementDescription
                            }
                            onChange={handleInputChange}/>
                    </Grid>
                    <Grid item>
                        <TextField id="elementRemarks-input" name="elementRemarks" label="Element Remarks" type="text" multiline
                            rows={3}
                            value={
                                formValues.elementRemarks
                            }
                            onChange={handleInputChange}/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{mb: 2, color:"red"}}>Note: This Program Support Only PNG format. Please Convert The Plan File to PNG Format Before Uploading</Typography>
                        <Input fullWidth id="planImage-input" name="planImage" type="file"
                        onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Add Element</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddElementPage;

