import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

import axios from "axios";
import {useState, useEffect} from "react";
import ZoomImage from "../../components/ZoomImage/App";

import * as BACKEND from '../../constants/routes';


// const INIT_DATA = {
//     projectId: "i2sneaz59tmn",
//     floorId: "FP000",
//     elementId: "EL001",
// };

const ViewerPage = () => { 
    
    // const [imgUrl, setImgUrl] = useState(BACKEND.ENDPOINT + "/project/get-image/ayr_1_floor.png");
    const [excelUrl, setExcelUrl] = useState(BACKEND.ENDPOINT + "/project/get-spread-sheet?project_id=i2sneaz59tmn&floor_id=FP000&element_id=EL001");

    const [projectList, setProjectList] = useState([]);
    const [projectData, setProjectData] = useState("");

    const [levelList, setLevelList] = useState([]);
    const [levelData, setLevelData] = useState("");

    const [elementList, setElementList] = useState([]);
    const [elementData, setElementData] = useState("");

    const [recordData, setRecordData] = useState({});


    // const [formValues, setFormValues] = useState(INIT_DATA);
    
    // const imgUrl = "http://localhost:8000/project/get-image/i2sneaz59tmn_FP000_EL001.png"
    // const imgUrl = "http://localhost:8000/project/get-image/ayr_1_floor.png"
    // const imgUrl = "http://localhost:8000/project/get-image/abc"


    const fetchProjectData = async () => {
        await axios.get(BACKEND.ENDPOINT + "/app-data/list_all_projects").then(response => {setProjectList(response.data)})
    }

    const fetchLevelData = async () => {
        if (typeof(projectData.project_id) !== "undefined") {
            await axios.get(BACKEND.ENDPOINT + "/app-data/list_all_levels/" + projectData.project_id).then(response => {setLevelList(response.data.floors)})
        }
    }

    const fetchElementData = async () => {
        if (typeof(projectData.project_id) !== "undefined" && typeof(levelData.floor_id) !== "undefined") {
            await axios.get(BACKEND.ENDPOINT+ "/app-data/list_all_elements/" + projectData.project_id + "/" + levelData.floor_id).then(response => {setElementList(response.data.elements)})
        }
    }

    const fetchRecordData = async () => {
        if (typeof(projectData.project_id) !== "undefined" && typeof(levelData.floor_id) !== "undefined" && typeof(elementData.element_id) !== "undefined") {
            await axios.get(BACKEND.ENDPOINT + `/project/get-record?project_id=${projectData.project_id}&floor_id=${levelData.floor_id}&element_id=${elementData.element_id}`)
            .then(response => {
                const res_data = response.data;
                res_data['img_name'] = BACKEND.ENDPOINT + "/project/get-image/" + res_data['img_name'];
                setRecordData(res_data)
            })
        }

    }

    useEffect(() => {
        fetchProjectData();
    }, [])
    
    useEffect(() => {
        fetchLevelData();
    }, [projectData]);

    useEffect(() => {
        fetchElementData();
    }, [levelData]);

    useEffect(() => {
        fetchRecordData();
        setExcelUrl(BACKEND.ENDPOINT + `/project/get-spread-sheet?project_id=${projectData.project_id}&floor_id=${levelData.floor_id}&element_id=${elementData.element_id}`);
    }, [elementData]);


    
    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormValues({
    //         ...formValues,
    //         [name]: value
    //     });
    // };

    return (
        <Box display="flex" flexDirection="column" width="100%" height="90%"
            // alignItems="center"
            // justifyContent="center"
        >
            {/* <Button variant="contained" onClick={() => console.log(recordData)}>TEST</Button> */}
            <Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center" marginTop={2}>
                    <FormControl size="small" sx={{mx: 1, minWidth: 150}}>
                        <InputLabel id="projectName-select-label">Project</InputLabel>
                        <Select labelId="projectName-select-label"
                            // defaultValue={{"project_id": "i2sneaz59tmn", "project_name": "Test1"}}
                            // name="projectId"
                            value={projectData}
                            onChange={(e) => setProjectData(e.target.value)}>
                                {projectList.map((projectData, index) => {
                                    return <MenuItem key={index} value={projectData}>{projectData.project_name}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{mx: 1, minWidth: 120}}>
                        <InputLabel id="floorId-select-label">Level</InputLabel>
                        <Select labelId="floorId-select-label"
                            defaultValue={"FP000"}
                            name="floorId"
                            value={levelData}
                            onChange={(e) => setLevelData(e.target.value)}>
                                {levelList.map((levelData, index) => {
                                    return <MenuItem key={index} value={levelData}>{"Floor " + levelData.floor_no}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{mx: 1, minWidth: 120}}>
                        <InputLabel id="elementName-select-label">Element</InputLabel>
                        <Select labelId="elementName-select-label"
                            // defaultValue={"EL001"}
                            // name="elementId"
                            value={elementData}
                            onChange={(e) => setElementData(e.target.value)}>
                                {elementList.map((elementData, index) => {
                                    return <MenuItem key={index} value={elementData}>{elementData.element_name}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                
                <Button variant="contained" color="primary" sx={{mx: 1}}
                    // sx={
                    //     {
                    //         position: 'absolute',
                    //         top: "7%",
                    //         left: "45%",
                    //         zIndex: 100
                    //     }
                // }
                >
                    <a href={excelUrl} download
                        style={
                            {
                                textDecoration: 'none',
                                color: "whitesmoke"
                            }
                    }>
                        Generate Spread Sheet
                    </a>

                </Button>
            </Box>
            <Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
                <ZoomImage recordData={recordData}/>
            </Box>


        </Box>
    )
}

export default ViewerPage;

