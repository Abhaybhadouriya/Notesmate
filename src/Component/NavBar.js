import { FormatAlignCenter } from "@material-ui/icons";
import React, { Component } from "react";

class NavBar  extends Component {
    render() {

    const name1 ={
        fontSize: 30 ,
        color: '#901df5',
        fontWeight : 600
        }
       const name2 ={
            fontSize: 30 ,
            color: '#636263',
            fontWeight : 600
            }

      

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
       <span style ={ name1} >COVID19</span><span style={name2}>TRACKER</span>
      </div>
    );
  }
}


export default NavBar;
