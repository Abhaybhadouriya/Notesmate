import React from 'react'
import './Head_Foot.css'
import NoteIcon from '@material-ui/icons/Note';

const Header = () => {

    

    return (
        <div className="Header">
            <NoteIcon style={{fontSize:25}} className="noteicon"/><span style={{fontSize:25}} className="headname1">NOTES</span><span style={{fontSize:25}} className="headname2">MATE</span>
        </div>
    )
}

export default Header
