import ShadedClickableBox from "../../../components/shadedClickableBox";
import { colors, spacing } from "../../../utils/theme";
import { useState, useEffect } from 'react';
import axiosService from "../../../utils/axios"


export default function Likes() {
    const user = localStorage.getItem("user")
    const [notifs, setNotifs] = useState([])

    const fetchdata = async () => {
        const res = await axiosService.get("authors/" + user+ "/inbox/likes/")
        console.log("Finding inbox likes")
        setNotifs(res.data.items)
        return res.data.items;
    };
    useEffect(() => {
        let interval = setInterval(() => {
            const res = fetchdata();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

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