import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Posting from './components/Posts/Posting'

function Home() {

    return (<div className = {"mainContainer"}>
        <div> <div> Home Page </div> </div>
        <Posting />
        </div>
    );
  }

  export default Home;
