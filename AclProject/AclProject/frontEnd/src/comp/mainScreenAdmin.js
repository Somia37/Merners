import React from 'react'
import { Row } from 'react-bootstrap'
import './screen.css'

const MainScreenAdmin = ({title,children}) => {
    return (
        <div className = 'mainback'>
                <Row>
                    <div className = "page">
                        {title && (
                            <>
                            <h1 className = "heading" >{title}</h1>  
                            <hr /> 
                            </>
                        )}
                        {children}
                    </div>
                </Row>
        </div>
    )
}

export default MainScreenAdmin
