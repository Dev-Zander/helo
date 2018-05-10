import React, { Component } from 'react';
import Header3 from './header3';
import axios from 'axios';




class Search extends Component {
    constructor(props) {
        super(props)

    
        this.state = {

            allUserProfiles: [],
            currentPage: 1,
            usersPerPage: 10,
            friendMatch: true,
            searchType: '',
            searchCriteria: '',
            searchingInfo:'',
            searchClick: 'blank',
            currentUser: '',
            myFriendsList:[]
        }

this.handlePageClick = this.handlePageClick.bind(this)
this.handleSearchInput = this.handleSearchInput.bind(this)
this.handleSearchClick =  this.handleSearchClick.bind(this)
this.selectedFilter = this.selectedFilter.bind(this)
this.handleResetClick = this.handleResetClick.bind(this)
this.addFriend = this.addFriend.bind(this)
this.removeFriend = this.removeFriend.bind(this)

    }

    componentWillMount() {
        axios.get('/api/getuserinfo').then(res => {
            this.setState({
                friendMatch: res.data[0].id,
                currentUser: res.data[0].id
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
                allUserProfiles: userList
            })
        })
    }




    handlePageClick(e){
        this.setState({
            currentPage: Number(e.target.id)
        })
    }
    handleResetClick(){
        this.setState({
            searchClick: 'blank',
            searchCriteria: ''
        })
    }
    
    handleSearchInput(searchInfo){
let results = searchInfo.toUpperCase()
        this.setState({
            searchCriteria: results
        })
    }
    
    handleSearchClick(searchingInfo){
let results = searchingInfo.toUpperCase()
        this.setState({
            searchClick: results
        })
    }

    selectedFilter(firstLast){

        this.setState({
            searchType: firstLast.target.value
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

    removeFriend(friendID){
        let myFriendsData = {
            myUserID: this.state.currentUser,
            myFriendsID: friendID
        }
        axios.post('/api/removefriend', myFriendsData).then(response =>{

        }).catch(response =>{
            console.log('Friend Not Removed')
        })
    }
    render() {

      
        let {allUserProfiles, currentPage, usersPerPage}= this.state;

        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let profiles = allUserProfiles.slice(indexOfFirstUser, indexOfLastUser)

        //let profiles = this.state.allUserProfiles

        let profilesMapped = profiles.map((users, index) => {

            if (this.state.searchClick === 'blank') {
                return (
                    <div key={index} className="profile_list">
                        <img alt="thumbnail" className="photo_box" src={`${users.photo}`} />
                        <div className="profile_name">
                            {users.first_name}
                            <br />
                            {users.last_name}</div>
                        {this.state.friendMatch === users.helo_friend_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className="remove_friend">Remove Friend</button>:
                            <button onClick={() => { this.addFriend(users.id) }} className="add_friend">Add Friend</button> 
                        }
                       
                    </div>

                )
            }

            if (users.first_name.toUpperCase() === this.state.searchClick && this.state.searchType === 'first_name') {
                return (
                    <div key={index} className="profile_list">
                        <img alt="thumbnail" className="photo_box" src={`${users.photo}`} />
                        <div className="profile_name">
                            {users.first_name}
                            <br />
                            {users.last_name}</div>
                        {this.state.friendMatch === users.helo_friend_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className="remove_friend">Remove Friend</button>:
                            <button onClick={() => { this.addFriend(users.id) }} className="add_friend">Add Friend</button> 
                        }
                    </div>

                )
            }
            if(users.last_name.toUpperCase() === this.state.searchClick && this.state.searchType === 'last_name'){
                console.log(users.helo_friend_id, 'helo_friend_id 3')
                
                return (
                    <div key={index} className="profile_list">
                        <img alt="thumbnail" className="photo_box" src={`${users.photo}`} />
                        <div className="profile_name">
                            {users.first_name}
                            <br />
                            {users.last_name}</div>
                        {this.state.friendMatch === users.helo_friend_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className="remove_friend">Remove Friend</button>:
                            <button onClick={() => { this.addFriend(users.id) }} className="add_friend">Add Friend</button> 
                        }
                    </div>

                )
            }

            
        })

        let pageNumbers = [];
        for(let i=1; i<=Math.ceil(allUserProfiles.length / usersPerPage); i++){
            pageNumbers.push(i)
        }

        const showPageNumbers = pageNumbers.map(number => {
            return(
                <li
                key={number}
                id ={number}
                onClick={this.handlePageClick}
                >
                {number}
                </li>
            )
        })
        return (

            <div>
                <Header3 />
                <div className="main-container">
                    <div className="searchable-friends">


                        <div className='searchscreen-buttons'>
                        <select onChange={this.selectedFilter}>
                            <option value="first_name">First Name</option>
                            <option value="last_name">Last Name</option>
                        </select>
                        <input className="search-input" onChange={(e)=>{this.handleSearchInput(e.target.value)}}/>
                        <button className="search-button" onClick={()=> {this.handleSearchClick(this.state.searchCriteria)}}>Search</button>
                        <button className="reset-button" onClick={()=> {this.handleResetClick()}}>Reset</button>
                        </div>

                    
                        <div className='flex-me'>{profilesMapped}</div>

                        <div>{showPageNumbers}</div>
                    </div>



                </div>
            </div>

        )
    }
}


export default Search
