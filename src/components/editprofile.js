import React, { Component } from 'react';
import Header2 from './header2';
import axios from 'axios';



class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            userPhoto: '',
            gender: '',
            hair: '',
            eye: '',
            hobby: '',
            birthday: '',
            birthmonth: '',
            birthyear: ''

        }
        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateGender = this.updateGender.bind(this)
        this.updateHair = this.updateHair.bind(this)
        this.updateEye = this.updateEye.bind(this)
        this.updateHobby = this.updateHobby.bind(this)
        this.updateBirthday = this.updateBirthday.bind(this)
        this.updateBirthMonth = this.updateBirthMonth.bind(this)
        this.updateBirthYear = this.updateBirthYear.bind(this)

    }
    componentWillMount() {
        axios.get('/api/getuserinfo').then(res => {
            console.log(res.data)
            this.setState({
                firstName: res.data[0].first_name,
                lastName: res.data[0].last_name,
                userPhoto: res.data[0].photo,
                gender: res.data[0].gender,
                hair: res.data[0].hair_color,
                eye: res.data[0].eye_color,
                hobby: res.data[0].hobby,
                birthday: res.data[0].birthday_day,
                birthmonth: res.data[0].birth_month,
                birthyear: res.data[0].birth_year
            })
        })
    }
  

    cancelChange() {
        axios.get('/api/getuserinfo').then(res => {
            console.log(res.data)
            this.setState({
                firstName: res.data[0].first_name,
                lastName: res.data[0].last_name,
                userPhoto: res.data[0].photo,
                gender: res.data[0].gender,
                hair: res.data[0].hair_color,
                eye: res.data[0].eye_color,
                hobby: res.data[0].hobby,
                birthday: res.data[0].birthday_day,
                birthmonth: res.data[0].birth_month,
                birthyear: res.data[0].birth_year
            })
        })

    }

    updateInfo() {
        let profileInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userPhoto: this.state.userPhoto,
            gender: this.state.gender,
            hair: this.state.hair,
            eye: this.state.eye,
            hobby: this.state.hobby,
            birthday: this.state.birthday,
            birthmonth: this.state.birthmonth,
            birthyear: this.state.birthyear
        }
        axios.post('/api/updateProfile', profileInfo).then(response => {
            console.log(response, 'Response From BackEnd')
        })

    }

    updateFirstName(newName) {
        this.setState({
            firstName: newName.target.value
        })
    }
    updateLastName(newName) {
        this.setState({
            lastName: newName.target.value
        })
    }
    updateGender(newGender) {
        this.setState({
            gender: newGender.target.value
        })
    }
    updateHair(newHair) {
        this.setState({
            hair: newHair.target.value
        })
    }
    updateEye(newEye) {
        this.setState({
            eye: newEye.target.value
        })
    }
    updateHobby(newHobby) {
        this.setState({
            hobby: newHobby.target.value
        })
    }
    updateBirthday(newBirthday) {
        this.setState({
            birthday: newBirthday.target.value
        })
    }
    updateBirthMonth(newBirthMonth) {
        this.setState({
            birthmonth: newBirthMonth.target.value
        })
    }
    updateBirthYear(newBirthYear) {
        this.setState({
            birthyear: newBirthYear.target.value
        })
    }


    render() {
        return (

            <div>
                <Header2 />
                <div className="edit-text-info">
                    <div className="profile-headerbox">
                        <img alt="user" src={this.state.userPhoto} className="profile-photo"></img>
                        <div className="profile-username">
                            <span>{this.state.firstName}</span>
                            <br />
                            <span>{this.state.lastName}</span>
                        </div>
                        <button onClick={() => { this.updateInfo() }} className="update-button">Update</button>
                        <button onClick={() => { this.cancelChange() }} className="cancel-button">Cancel</button>
                    </div></div>
                <div className="main-container2">
                    <div className="edit_profile_container">
                        <div className="left-profile-column">
                            <span className="left-profile-text">First Name</span>
                            <input value={this.state.firstName} onChange={this.updateFirstName} className="left-profile-input" />
                            <span className="left-profile-text">Last Name</span>
                            <input value={this.state.lastName} onChange={this.updateLastName} className="left-profile-input" />
                            <span className="left-profile-text">Gender</span>
                            <select value={this.state.gender} onChange={this.updateGender} className="left-profile-input">
                                <option value={this.state.gender} selected>{this.state.gender}</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <span className="left-profile-text">Hair Color</span>
                            <select value={this.state.hair} onChange={this.updateHair} className="left-profile-input">
                                <option value={this.state.hair} selected>{this.state.hair}</option>
                                <option value="Black">Black</option>
                                <option value="Blonde">Blonde</option>
                                <option value="Brown">Brown</option>
                                <option value="Red">Red</option>
                            </select>
                            <span className="left-profile-text">Eye Color</span>
                            <select value={this.state.eye} onChange={this.updateEye} className="left-profile-input">
                                <option value={this.state.eye} selected>{this.state.eye}</option>
                                <option value="Brown">Brown</option>
                                <option value="Green">Green</option>
                                <option value="Hazel">Hazel</option>
                                <option value="Blue">Blue</option>
                                <option value="Black">Black</option>
                            </select>
                        </div>
                        <div className="right-profile-column">
                            <span className="right-profile-text">Hobby</span>
                            <select value={this.state.hobby} onChange={this.updateHobby} className="right-profile-input">
                                <option value={this.state.hobby} selected>{this.state.hobby}</option>
                                <option value="Sports">Sports</option>
                                <option value="Music">Music</option>
                                <option value="Traveling">Traveling</option>
                                <option value="Dancing">Dancing</option>
                                <option value="ReadingWriting">Reading & Writing</option>
                                <option value="Computers">Computers</option>
                                <option value="Gardening">Gardening</option>
                                <option value="VideoGames">Video Games</option>
                            </select>
                            <span className="right-profile-text">Birthday Day</span>
                            <select value={this.state.birthday} onChange={this.updateBirthday} className="right-profile-input">
                                    <option value={this.state.birthday} selected>{this.state.birthday}</option>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                            </select>
                                <span className="right-profile-text">Birthday Month</span>
                                <select value={this.state.birthmonth} onChange={this.updateBirthMonth} className="right-profile-input">
                                    <option value={this.state.birthmonth} selected>{this.state.birthmonth}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <span className="right-profile-text">Birthday Year</span>
                                <select value={this.state.birthyear} onChange={this.updateBirthYear} className="right-profile-input">
                                    <option value={this.state.birthyear} selected>{this.state.birthyear}</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    <option value="1939">1939</option>
                                    <option value="1938">1938</option>
                                    <option value="1937">1937</option>
                                    <option value="1936">1936</option>
                                    <option value="1935">1935</option>
                                    <option value="1934">1934</option>
                                    <option value="1933">1933</option>
                                    <option value="1932">1932</option>
                                    <option value="1931">1931</option>
                                    <option value="1930">1930</option>
                                    <option value="1929">1929</option>
                                    <option value="1928">1928</option>
                                    <option value="1927">1927</option>
                                    <option value="1926">1926</option>
                                    <option value="1925">1925</option>
                                    <option value="1924">1924</option>
                                    <option value="1923">1923</option>
                                    <option value="1922">1922</option>
                                    <option value="1921">1921</option>
                                    <option value="1920">1920</option>
                                    <option value="1919">1919</option>
                                    <option value="1918">1918</option>
                                    <option value="1917">1917</option>
                                    <option value="1916">1916</option>
                                    <option value="1915">1915</option>
                                    <option value="1914">1914</option>
                                    <option value="1913">1913</option>
                                    <option value="1912">1912</option>
                                    <option value="1911">1911</option>
                                    <option value="1910">1910</option>
                                    <option value="1909">1909</option>
                                    <option value="1908">1908</option>
                                    <option value="1907">1907</option>
                                    <option value="1906">1906</option>
                                    <option value="1905">1905</option>
                                </select>
                        </div>
                        </div>
                    </div>
                </div>

                )
            }
        }
        
        
        export default EditProfile
