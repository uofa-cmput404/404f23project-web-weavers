import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar(){
    const nav= useNavigate();
    const location= useLocation();


    const currentState= (nav, location) => {    nav(`${location.pathname}`, {state: {refresh:true}});   }


    return(
        <ul
            id= "navbar"
            className=""
        >
            <div
                className="my-stream"
            >

            </div>


            <div
                className="my-stream"
            >

            </div>



        </ul>




    )



}