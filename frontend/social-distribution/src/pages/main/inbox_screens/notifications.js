import ShadedClickableBox from "../../../components/shadedClickableBox";
import { colors, spacing } from "../../../utils/theme";
import { useState, useEffect } from 'react';
import {API_URL} from "../../../components/api";
import axios from 'axios';


export default function Notifications() {
    const user = localStorage.getItem("user")
    const [notifs, setNotifs] = useState([])

    const fetchdata = async () => {
        const res = await axios.get(API_URL + "/authors/" + user+ "/inbox/")
        console.log(res.data.items)
        setNotifs(res.data.items)
    };
    useEffect(() => {
        fetchdata();
    }, [])

    const placeholder = [
        {content:'You have a new friend request from user1'},
        {content:'You have a new friend request from user2'},
        {content:'You have a new friend request from user3'},
        {content:'You have a new friend request from user4'},
        {content:'You have a new friend request from user5'},
        {content:'You have a new friend request from user6'},
        {content:'user4 liked your post'},
        {content:'user5 liked your post'},
        {content:'user6 liked your post'},
        {content:'user7 liked your post'},
        {content:'user8 liked your post'},

    ]

    return(
        <div style={styles.container}>
                {notifs.map((item) => (
                    // console.log(item.content),
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