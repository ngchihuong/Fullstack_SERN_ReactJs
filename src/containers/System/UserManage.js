import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,

        }
    }
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact =async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    createNewUser = async(data) => {
        try {
           let response = await createNewUserService(data)  
           if (response && response.errCode !== 0) {
            alert(response.errMessage);
           }else {
            await this.getAllUsersFromReact();
            this.setState({
                isOpenModalUser: false,
            })
           }
        } catch (error) {
            console.log(error);
        }
    }

    /** Life cycle
     * Run component: 
     * 1. Run construct -> init state
     * 2.Did mount (set State) 
     * 3. Render (re-render)
     * 
     */

    render() {
        // console.log("check render", this.state);
        // let arrUsers = this.state.arrUsers; cach 1
        let { arrUsers } = this.state; // cach 2 :v
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                ></ModalUser>
                <div className='title text-center'>
                    Manage users with Huong dep trai
                </div>
                <div className='mx-1 px-3'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className='user-table mt-3 mx-3'>
                    <table id="customers">
                    <tbody>

                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Genders</th>
                            <th>Actions</th>
                        </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.gender === 0 ? 'Male' : 'Female'}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
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
