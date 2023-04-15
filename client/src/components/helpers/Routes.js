import React from 'react'
import {BrowserRouter,Route, Routes as Switch} from 'react-router-dom'
import WebNavbar from '../WebNavbar'
import Dashboard from '../Dashboard'
import LocalList from '../local/LocalList'
import MongoList from '../mongo/MongoList'

const Rout=()=>{
    return(
        <BrowserRouter>
        <WebNavbar/>
        <Switch>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/local' element={<LocalList/>}/>
            <Route path='/mongo' element={<MongoList/>}/>
        </Switch>
        </BrowserRouter>
    )

}

export default Rout