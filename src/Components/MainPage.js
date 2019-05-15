import React, { Component } from "react"

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            currentPage: 1,
            totalPages: [],
            itemsPerPage: 5,
            hideNext: false,
            hidePrevious: false,
            addFirstName: '',
            addLastName: '',
            addEmail: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(newFirstName, newLastName, newEmail) {
        // Method to collect API and user input data
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
        if (newFirstName && newLastName && newEmail) {
            let newName = newFirstName + ' ' + newLastName;
            data.push({name: newName, email: newEmail})
            this.setState({addFirstName: ''})
            this.setState({addLastName: ''})
            this.setState({addEmail: ''})
        }
        // Quick way to sort everything alphabetically, resets when a new user is added
        let sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name))
        .map((item, i) => <sortedUsers key={i} data={item} />);

        // Save our ordered user object in state
        this.setState({
          users: data
        });

        // Math to figure out how many pages there will be
        const { users, currentPage, itemsPerPage } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        this.setState({totalPages: pageNumbers})

      });
      this.checkButtons()
    }

    checkButtons() {
        // Updates the state of the buttons based on the position in the list
        if ((this.state.currentPage !== this.state.totalPages.length) && (this.state.currentPage != 1)) {
            this.setState({hideNext: false})
            this.setState({hidePrevious: false})
        }
        if (this.state.currentPage == (this.state.totalPages.length)) {
            this.setState({hideNext: true})
            this.setState({hidePrevious: false})
        }
        if (this.state.currentPage == 1) {
            this.setState({hideNext: false})
            this.setState({hidePrevious: true})
        }
    }

    handleClick(event) {
        // Controls the buttons for navigating the list
        if (event.target.id == 'next' && this.state.currentPage < this.state.totalPages.length) {
            this.setState({currentPage: this.state.currentPage + 1}, () => {
                this.checkButtons();
            });
        }
        if (event.target.id == 'previous' && this.state.currentPage > 1) {
            this.setState({currentPage: this.state.currentPage - 1}, () => {
                this.checkButtons();
            });
        }
    }

    handleSubmit(event) {
        // Form submission handling
        this.fetchData(this.state.addFirstName, this.state.addLastName, this.state.addEmail)
        event.preventDefault();
    }

    handleChange(event) {
        // Updates form values in state as they're being typed
        if (event.target.id == 'first-name') {
            this.setState({addFirstName: event.target.value});
        }
        if (event.target.id == 'last-name') {
            this.setState({addLastName: event.target.value});
        }
        else if (event.target.id == 'email') {
            this.setState({addEmail: event.target.value})
        }
    }


    render() {
        const { users, currentPage, itemsPerPage } = this.state;
        console.log(this.state.currentPage)

        // Logic for displaying users
        const indexOfLast = currentPage * itemsPerPage;
        const indexOfFirst = indexOfLast - itemsPerPage;
        const currentUsers = users.slice(indexOfFirst, indexOfLast);

        // Shows .biz emails in green
        const renderUsers = currentUsers.map((user, index) => {
        if (user.email.substr(user.email.length - 3) == 'biz') {
            return <li id='alternate-text' key={index}>{user.name}</li>;
        }
            else {
                return <li key={index}>{user.name}</li>;
            }
        });

        // Style changer for showing/hiding buttons
        const hideNext = this.state.hideNext ? {display: 'none'} : {}
        const hidePrevious = this.state.hidePrevious ? {display: 'none'} : {}

        return (
            <div>
                <ul>
                    {renderUsers}
                </ul>
                <h1 style={hideNext} id="next" onClick={this.handleClick}>
                    Next
                </h1>
                <h1 style={hidePrevious} id="previous" onClick={this.handleClick}>
                    Previous
                </h1>
                <h1> {this.state.currentPage} </h1>
                <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input type='text' id="first-name" pattern="[A-Za-z0-9]+" value={this.state.addFirstName} onChange={this.handleChange}/>
                </label>
                <label>
                    Last Name:
                    <input type='text' id="last-name" pattern="[A-Za-z0-9]+" value={this.state.addLastName} onChange={this.handleChange}/>
                </label>
                <label>
                    Email:
                    <input type='email' id="email" value={this.state.addEmail} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default MainPage;
