import React from 'react'
import { Link } from 'react-router-dom'

export default function UploadedGrade(props) {
    return (
        <div class="login-page">
        <div class="form">
            <p class="registered">Note wurde erfolgreich hochgeladen!</p>
            <br />
            <Link to="/home" class="menu_btn_upload" id="btn_home">Zurück zum Hautpmenü</Link>
            <br />
            <br />
            <br />
            <Link to={/*props.location.state.subject || */"/home"} class="menu_btn_upload" id="btn_subj">Zurück zum Fach</Link>
        </div>
      </div>
    )
}
