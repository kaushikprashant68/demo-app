import { useState, useEffect } from "react"
import { Button, Grid, Container } from "@material-ui/core";
import MediaCard from "../Components/common/Card";
import CustomModal from "../Components/common/CustomModal";
import AddUser from "./Adduser";
import * as d3 from "d3";
import AnimatedBar from "../Components/common/AnimatedBarHooks";

export default function Userlist() {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const generateGraphData = (users, length = 5) =>
        d3.range(length).map((item, index) => {
            let singleUser = users && users[index] || {};
            return {
                index: index,
                date: index,
                value: singleUser.friends && singleUser.friends.length || 0
            }
        });

    const [data, setData] = useState(generateGraphData());

    useEffect(() => {
        //get all Data from local storage
        let data = window.localStorage.getItem('users');
        data = data ? JSON.parse(data) : [];
        setUsers(data);
        setData(generateGraphData(data, data.length));
    }, []);

    const updatedUsers = (users) => {
        setUsers(users);
    }

    const openEditModal = (user) => {
        setEditedUser(user);
        setOpenModal(true);
    }

    console.log("The data are", data)
    return (
        <Container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="cus-grids">
                    <Grid container spacing={2}>
                        {
                            users && users.length && users.map((item, index) => {
                                return <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <MediaCard userData={item} allUsers={users} updatedUsers={updatedUsers} openEditModal={openEditModal} />
                                </Grid>
                            }) || <p>No User Exist</p>
                        }
                        <CustomModal className="edit-user" open={openModal} closeModal={() => setOpenModal(false)}>
                            <AddUser edit={true} editedUser={editedUser} updatedUsers={updatedUsers} closeModal={() => setOpenModal(false)} />
                        </CustomModal>
                    </Grid>
                </div>
                <div className="cus-chart">
                    <AnimatedBar
                        data={data}
                        width={300}
                        height={200}
                        top={20}
                        bottom={30}
                        left={30}
                        right={0}
                    />
                </div>
            </Grid>
        </Container>
    )
}