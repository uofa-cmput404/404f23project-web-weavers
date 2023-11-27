import React from "react";
import {colors, spacing, sizes} from "../../utils/theme";
import PostItem from "./postItem";

export default function PostFeed() {

    return(
        <div style={styles.container}>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
        </div>
    );
}

const styles = {
    container:{
        backgroundColor: colors.brand.c5,
        height: "58vh",
        width: "50%",
        borderRadius: spacing.md,
        boxShadow:"0 4px 12px 0 rgba(0,0,0,0.5)",
        overflow: "scroll",
    }
}