import React from 'react'
import {Link} from 'react-router-dom'

function NotFound()  {
    
        return (
            <div>404!
            <img/>
            <p>The kitties couldn't locate that particular page</p>
            <Link to='/' />
            Go Home
            <Link/>
            </div>
        )
    }


export default NotFound
