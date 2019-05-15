import React, { Component } from "react"

class GetUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => console.log(data));
    }

    render() {
        return <div>Test</div>;
    }

};
export default GetUsers;
