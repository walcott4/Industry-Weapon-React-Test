import React, { Component } from "react"
import MainPage from './Components/MainPage'

class App extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
        	<div>
        		<h1>Walcott Denison Applicant Test</h1>
                <MainPage />
        	</div>

        )
    }
};

export default App
