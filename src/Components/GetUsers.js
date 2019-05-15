import React, { Component } from "react"

class GetUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            currentPage: 1,
            totalPages: [],
            itemsPerPage: 5
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
          let sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name))
          .map((item, i) => <sortedUsers key={i} data={item} />);

          this.setState({
              users: data
          });

          const { users, currentPage, itemsPerPage } = this.state;
          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
            pageNumbers.push(i);
          }
          this.setState({totalPages: pageNumbers})

      });
    }

    handleClick(event) {
        if (event.target.id == 'next') {
            if (this.state.currentPage < this.state.totalPages.length){
                this.setState({currentPage: this.state.currentPage + 1})
                console.log(this.state.currentPage)
            }
            else {
                console.log("bad")
            }
        }
        else if (event.target.id == 'previous') {
            if (this.state.currentPage > 1) {
                this.setState({currentPage: this.state.currentPage - 1})
            }
            else {
                console.log("bad previous")
            }
        }
    }



//     function createPages() {
//
// }

    render() {
      const { users, currentPage, itemsPerPage } = this.state;
      console.log(this.state.totalPages.length)

      // Logic for displaying users
      const indexOfLast = currentPage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;
      const currentUsers = users.slice(indexOfFirst, indexOfLast);

      const renderUsers = currentUsers.map((user, index) => {
        if (user.email.substr(user.email.length - 3) == 'biz') {
            return <li id='alternate-text' key={index}>{user.name}</li>;
        }
        else {
            return <li key={index}>{user.name}</li>;
        }
      });



      const renderPageNumbers = this.state.totalPages.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });


      return (
        <div>
          <ul>
            {renderUsers}
          </ul>
          <h1 id="next" onClick={this.handleClick}>
            Next
          </h1>
          <h1 id="previous" onClick={this.handleClick}>
            Previous
          </h1>
          <h1> {this.state.currentPage} </h1>
        </div>
      );
      }
      }








export default GetUsers;
