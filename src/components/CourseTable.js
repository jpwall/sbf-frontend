import React, { Component } from 'react';

class CourseTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Mininum Desired Grade</th>
                </tr>
              </thead>
              <tbody>
                {
                    this.props.rowData.map((user) =>
                              <tr key={user.uid.toString()}>
                                <td>{user.full_name}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.min_grade}</td>
                              </tr>
                             )
                }
              </tbody>
            </table>
        );
    }
}

export default CourseTable;
