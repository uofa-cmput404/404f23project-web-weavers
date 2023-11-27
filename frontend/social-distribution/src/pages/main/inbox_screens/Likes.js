import ShadedClickableBox from "../../../components/shadedClickableBox";
import { colors, spacing } from "../../../utils/theme";
import { useState, useEffect } from 'react';
import {API_URL} from "../../../components/api";
import axios from 'axios';
import axiosService from "../../../utils/axios"


export default function Likes() {
    const user = localStorage.getItem("user")
    const [notifs, setNotifs] = useState([])

    const fetchdata = async () => {
<<<<<<< HEAD:frontend/social-distribution/src/pages/main/inbox_screens/notifications.js
        const res = await axiosService.get("authors/" + user+ "/inbox/likes/")
=======
        const res = await axios.get(API_URL + "authors/" + user+ "/inbox/likes/")
        console.log("Inbox is: ")
>>>>>>> main:frontend/social-distribution/src/pages/main/inbox_screens/Likes.js
        console.log(res.data.items)
        setNotifs(res.data.items)
    };
    useEffect(() => {
        fetchdata();
    }, [])

    return(
        <div style={styles.container}>
                {notifs.map((item) => (
                    <ShadedClickableBox variant_='notif' text={item.summary}/>
                ))}
        </div>
    )

}

const styles = {
    container:{

        color: colors.text.t1,
        height: `calc(100vh - '50px'})`, // set height to remaining viewport height
        width: "400px",
        overflow: "auto",
    }
}