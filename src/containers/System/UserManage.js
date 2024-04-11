import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],

        }
    }
    // state = {

    // }

    async componentDidMount() {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    /** Life cycle
     * Run component: 
     * 1. Run construct -> list state
     * 2.Did mount (set State) 
     * 3. Render
     * 
     */

    render() {
        // console.log("check render", this.state);
        // let arrUsers = this.state.arrUsers; cach 1
        let { arrUsers } = this.state; // cach 2 :v
        return (
            <div className="users-container">
                <div className='title text-center'>
                    Manage users with Huong dep trai
                </div>
                <div className='user-table mt-3 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Genders</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item,index) => {
                            console.log("Check map :", item,"index", index);
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender === 0 ? 'Male' : 'Female'}</td>
                                    <td>
                                        <button className='btn-edit'><i class="fas fa-edit"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
