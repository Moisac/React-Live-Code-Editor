import React, { useState } from 'react'

//Icons
import { FiSettings } from 'react-icons/fi'
import { GrClose} from 'react-icons/gr'
import { BsLayoutSidebarInsetReverse, BsLayoutSidebarInset, BsLayoutThreeColumns, BsLayoutTextWindowReverse } from 'react-icons/bs' 

const Header = () => {
    const [settings, setSettings] = useState(false)
    const [layoutDropdown, setLayoutDropdown] = useState(false)
    const layoutStyle = localStorage.getItem('layoutStyle')
    const [changeLayout, setChangeLayout] = useState(layoutStyle || 'default')
    const titleStorage = localStorage.getItem('mainTitle')
    const [title, setTitle] = useState(titleStorage || 'Online Code Editor')
    const headerColorStorage = localStorage.getItem('headerBg')
    const [headerColor, setHeaderColor] = useState(headerColorStorage || '#ccc')
    const backgroundStorage = localStorage.getItem('backgroundColor' || '#f5f5f5')
    const [background, setBackground] = useState(backgroundStorage)


    const handleHeaderColor = (e) => {
        localStorage.setItem('headerBg', headerColor)
        setHeaderColor(e.target.value)
    }   
    const handleBackground = (e) => {
        localStorage.setItem('backgroundColor', background)
        setBackground(e.target.value)

    }
    const handleTitle = (e) => {
        localStorage.setItem('mainTitle', title)
        setTitle(e.target.value)
    }
    
    const handleChangeLayoutRight = () => {
        setChangeLayout('right')
        document.querySelector('.App').classList.remove('left')
        document.querySelector('.App').classList.add('right')
        localStorage.setItem('layoutStyle', 'right')
    }

    const handleChangeLayoutLeft = () => {
        setChangeLayout('left')
        document.querySelector('.App').classList.remove('right')
        document.querySelector('.App').classList.add('left')
        localStorage.setItem('layoutStyle', 'left')
    }

    const handleChangeLayoutDefault = () => {
        setChangeLayout('default')
        document.querySelector('.App').classList.remove('right')
        document.querySelector('.App').classList.remove('left')
        localStorage.setItem('layoutStyle', 'default')
    }
    return (
        <header style={{backgroundColor: `${headerColorStorage}`}}>
            <nav>
            <div className="title">{ titleStorage }</div>
                <div className="options">
                    <div className="settings" onClick={ () => setSettings(!settings) }>
                        <FiSettings /> <span>Settings</span>
                    </div>
                    { settings && 
                        (<div className="settings-dropdown">
                            <GrClose className="close" onClick={ e => setSettings(false) }/>
                            {/* Title */}
                            <label htmlFor="title">Project title</label>
                            <input type="text" name="title" value={title} onChange={ e => setTitle(e.target.value) } />
                            {  title !== titleStorage ?
                                (<button onClick={handleTitle}>Save</button>)
                                :
                                ''
                            }
                            {/* Header color */}
                            <label htmlFor="header-color">Header Color</label>
                            <input type="text" name="header-color" value={headerColor} onChange={ e => setHeaderColor(e.target.value) } />
                            { headerColor !== headerColorStorage ?
                                <button onClick={handleHeaderColor}>Save</button>
                            :
                             ''
                            }
                            {/* Background color */}
                             <label htmlFor="background-color">Background Color</label>
                            <input type="text" name="background-color" value={background} onChange={ e => setBackground(e.target.value) } />
                            { background !== backgroundStorage ?
                                <button onClick={handleBackground}>Save</button>
                            :
                             ''
                            }
                            
                    </div>) 
                    }
                    <div className="layout" onClick={ () => setLayoutDropdown(!layoutDropdown) }>
                        <BsLayoutTextWindowReverse /> Change Layout
                    </div>
                    { layoutDropdown && 
                        (   
                            <div className={`layout-dropdown ${changeLayout}`}>
                                <GrClose className="close" onClick={ e => setLayoutDropdown(false) }/>
                                <span>Edit layout</span>
                               <div className="icons">
                                <div className="single-layout right" onClick={handleChangeLayoutRight}>
                                        <BsLayoutSidebarInsetReverse />
                                    </div>
                                    <div className="single-layout left" onClick={handleChangeLayoutLeft}>
                                        <BsLayoutSidebarInset /> 
                                    </div>
                                    <div className="single-layout default" onClick={handleChangeLayoutDefault}>
                                        <BsLayoutThreeColumns />
                                    </div>
                               </div>
                            </div>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header
