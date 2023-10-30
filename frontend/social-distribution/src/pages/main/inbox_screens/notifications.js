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