import React, {  useState } from 'react'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2' 

//Icons
import { CgExpand } from 'react-icons/cg'
import { BiCollapse } from 'react-icons/bi'

const Editor = (props) => {
    const [open, setOpen] = useState(true)
    const { language, displayName, value, onChange } = props

    const handleChange = (editor, data, value) => {
        onChange(value)
    }
    

    return (
        <div className={`editor-container ${open ? '' : 'closed'}`}>
            <div className="title">
                <b>{ displayName }</b>
                <div className="collapse-icon" onClick={ () => setOpen(!open) }>{ open ? <BiCollapse /> : <CgExpand /> }</div>
            </div>
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options ={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    )
}

export default Editor
