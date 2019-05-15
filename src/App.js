import React, { Component } from "react"
import GetUsers from './Components/GetUsers'

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    render() {
        return (
        	<div>
        		<h1>Industry Weapon Applicant Test</h1>
                <GetUsers />
        	</div>

        )
    }
};
export default App
