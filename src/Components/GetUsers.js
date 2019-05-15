import React, { Component } from "react"
import Pagination from './Pagination'

class GetUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            currentPage: 1,
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
          console.log(this.state)

      });

    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    render() {
      const { users, currentPage, itemsPerPage } = this.state;

      // Logic for displaying users
      const indexOfLast = currentPage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;
      const currentUsers = users.slice(indexOfFirst, indexOfLast);

      const renderUsers = currentUsers.map((user, index) => {
        return <li key={index}>{user.name}</li>;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
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
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
      }
      }



















//     render() {
//         const users = this.state
//         console.log(users)
//         return (
//             <div>
//
//             </div>
//         );
//     }
//
// };
export default GetUsers;
