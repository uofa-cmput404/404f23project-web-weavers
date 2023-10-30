import ShadedClickableBox from "../../../components/shadedClickableBox";
import { colors, spacing } from "../../../utils/theme";
import React from "react";


export default function Notifications() {    
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
                {placeholder.map((item) => (
                    // console.log(item.content),
                    <ShadedClickableBox variant_='notif' text={item.content}/>
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