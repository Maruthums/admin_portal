import { Box, Button, Paper, Typography } from "@mui/material";
import AnimatedText from "../../components/AnimatedText";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import BasicModal from "../../components/Model";
import AddUserInfo from "../AddUserInfo/AddUserInfro";
import { store } from "../../service/redux/store";
import { getUserList } from "../../service/apis/userService";
import TransparentLoader from "../../components/TransparentLoader";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { color } from "../../styles/color";
const RootDashBoard = () => {
    const messages = [
        "Welcome back, boss 😎",
        "Vanakkam Panangulam! 🔥",
        "Access granted. Let's build 💻",
        "Ready to launch your next idea? 🚀"
    ];
    const [messageIndex, setMessageIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const { list } = useSelector(({ user }: any) => user);
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchList = async () => {
            await store.dispatch(getUserList({}));
        }
        fetchList();
    }, [])

    return (
        <Box>
            {list?.isLoading
                && <TransparentLoader />}

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
                <Typography sx={{
                    mb: 2,
                    fontSize: { xs: 16, md: 20 },
                    fontWeight: 600,
                    color: color.Mono5
                }}>
                    List of Family members registered in the system.
                </Typography>
                <UserCard people={list?.data} />
            </Box>
        </Box>

    )
}

export default RootDashBoard;