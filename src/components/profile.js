import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import axios from 'axios';


class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: '',
            pageTitle: '',
            userProfilePic: '',
            first_name: '',
            last_name: '',
            gender: '',
            hair_color: '',
            eye_color: '',
            hobby: '',
            birthday_birthday: '',
            birth_month: '',
            birth_year: '',
            profilesData: [],
            sortDefault: true,
            filterby: '',
            friendMatch: true,
            myFriendsList: []
            


        }
        this.selectedFilter = this.selectedFilter.bind(this)
        this.addFriend = this.addFriend.bind(this)

    }

    componentWillMount() {
        axios.get('/api/getuserinfo').then(res => {
            this.setState({

                currentUser: res.data[0].id,
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                userProfilePic: res.data[0].photo,
                gender: res.data[0].gender,
                hair_color: res.data[0].hair_color,
                eye_color: res.data[0].eye_color,
                hobby: res.data[0].hobby,
                birthday_birthday: res.data[0].birthday_day,
                birth_month: res.data[0].birth_month,
                birth_year: res.data[0].birth_year,
            })
        })
        axios.get('/api/getFriends').then(response =>{
            let friendsList = response.data
            this.setState({
                myFriendsList:friendsList
            })
        })
        axios.get('/api/getallusers').then(response => {
            let userList = response.data
            this.setState({
                profilesData: userList
            })
        })
    }

    selectedFilter(filter) {
        this.setState({
            filterby: filter.target.value,
            sortDefault: false

        })
    }
    addFriend(friendID){
        let myFriendsData = {
            MyUserID:this.state.currentUser,
            MyFriendsID: friendID
        }
        axios.post('/api/addfriend', myFriendsData).then(response =>{
        }

        ).catch(response =>{
            console.log('Friend Not Added')
        })
    }
    
    render() {
        let profiles = this.state.profilesData

        let profileMapped = profiles.map((profile, index) => {

        

                return (


                    <div key={index} className="profile_list">
                        <img alt="thumbnail" className="photo_box" src={`${profile.photo}`} />
                        <div className="profile_name">
                            {profile.first_name}
                            <br />
                            {profile.last_name}</div>
                            {this.state.friendMatch ?
                            <button onClick={()=>{this.addFriend(profile.id)}} className="add_friend">Add Friend</button>:
                            <button onClick={()=>{this.removeFriend(profile.id)}}className="remove_friend">Remove Friend</button>
                            }
                    </div>


                )
            
        })

        let profilesFiltered = profiles.map((profile, index) => {

            if (profile.id !== this.state.currentUser && profile[this.state.filterby] === this.state[this.state.filterby]) {

                return (


                    <div key={index} className="profile_list">
                        <img alt="thumbnail" className="photo_box" src={`${profile.photo}`} />
                        <div className="profile_name">
                            {profile.first_name}
                            <br />
                            {profile.last_name}</div>
                            {this.state.friendMatch ?
                            <button onClick={()=>{this.addFriend(profile.id)}} className="add_friend">Add Friend</button>:
                            <button onClick={()=>{this.removeFriend(profile.id)}}className="remove_friend">Remove Friend</button>
                            }
                    </div>


                )
            }
        })
        return (

            <div>
                <div className="main-container">
                    <div className="edit-profile-box">
                        <img alt="user" src={this.state.userProfilePic} className="photo-box" />
                        <div className="first_name">{this.state.first_name}</div>
                        <div className="last_name">{this.state.last_name}</div>
                        <Link to="/editprofile"> <button className="edit_button">Edit Profile</button></Link>
                        <div className="dashboard-text-info">
                            <h6 className="profile-text"> Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</h6>
                        </div>
                        <div className="recommended-friends">
                            <div className='container-header'>
                                <div className="recommended_text">Recommended Friends</div>
                                <div className='small-container'>
                                    <div>Sorted by</div>
                                    <div className='dropdown'>
                                        <select onChange={this.selectedFilter}>
                                            <option value="first_name">First Name</option>
                                            <option value="last_name">Last Name</option>
                                            <option value="gender">Gender</option>
                                            <option value="hair_color">Hair Color</option>
                                            <option value="eye_color">Eye Color</option>
                                            <option value="hobby">Hobby</option>
                                            <option value="birthday_day">Birth Day</option>
                                            <option value="birth_month">Birth Month</option>
                                            <option value="birth_year">Birth Year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div >
                                {this.state.sortDefault ?
                                    <div className='flex-me'>{profileMapped}</div> :
                                    <div className='flex-me'>{profilesFiltered}</div>
                                }

                            </div>
                        </div>







                    </div>

                </div>

            </div>


        )
    }
}


export default Profile
