import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
const App = () => {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
        <Router>
            <Routes>
                <Route path="*" element={<Join/>}/>
                <Route path="/" exact element={<Join/>} />
                <Route path="/chat" element={<Chat/>} />
            </Routes>
        </Router>
        </Suspense>
    )
}

export default App

