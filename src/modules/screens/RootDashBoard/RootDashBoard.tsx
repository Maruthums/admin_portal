import { Box, Button, Paper, Typography } from "@mui/material";
import BarChart from "../../components/barChart/BarChart";
import AnimatedText from "../../components/AnimatedText";
import { useEffect, useState } from "react";
import CustomGrid from "../../components/CustomGrid";
import BusSchedule from "../../components/BusSchedule";
import BasicSelect from "../../components/DropDown";
import { Add } from "@mui/icons-material";
import BasicModal from "../../components/Model";
import AddUserInfo from "../AddUserInfo/AddUserInfro";
import { store } from "../../service/redux/store";
import { getUserList } from "../../service/apis/userService";
const RootDashBoard = () => {

    const messages = [
        "Welcome back, boss 😎",
        "Vanakkam Panangulam! 🔥",
        "Access granted. Let's build 💻",
        "Ready to launch your next idea? 🚀"
    ];

    const [messageIndex, setMessageIndex] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        const fetchList = async () => {
           await store.dispatch(getUserList({}));
        }
        fetchList();
    },[])

    return (
        <Box>
            <BasicModal open={open} setOpen={setOpen}>
                <AddUserInfo />
            </BasicModal>
            <Box sx={{
                mb: 2,
                mt: 2
            }}>
                <AnimatedText text={messages[messageIndex]} />
            </Box>
            <Box sx={{
                mt: 2
            }}>
                <Button variant='contained' sx={{
                    mb: 2
                }}
                    onClick={() => setOpen((pre) => !pre)}
                >
                    <Add />  Add User
                </Button>
                <Paper sx={{
                    p: 1
                }}>
                    <CustomGrid />
                </Paper>
            </Box>
        </Box>

    )
}

export default RootDashBoard;