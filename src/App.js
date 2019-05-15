import React, { Component } from "react"
import GetUsers from './Components/GetUsers'
import Pagination from './Components/Pagination'

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
