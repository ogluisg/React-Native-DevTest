import axios from 'axios';

const http = axios.create({
    baseURL: 'https://eas-cors-anywhere.herokuapp.com/https://dev-test-api.thebigpos.com'
  });

http.defaults.headers = {
    "x-requested-with": "XMLHttpRequest"
}
  
const login = async (email, password) => {
    try {
        let { status, data : { token = '' } } = await http.post(`/auth`, { email, password})
        if(status == 200){
            return token;
        }
    } catch (error) {
        console.error(`Error logging in with error ${error}`)
    }
    return false;
}

const getSurveyData = async () => {
    try {
       let { status, data : surveys } = await http.get('/customer/surveys') 
       if(status == 200){
            return surveys;
       }
    } catch (error) {
        console.error(`Error fetching survey data with error ${error}`)
    }
    return [];
}

const getUsers = async (token) => {
    try {
     let {status, data : users } = await http.get('/users', { headers: { 'Authorization': `Bearer ${token}` }})
     if(status == 200){
         return users;
     }
    } catch (error) {
        console.error(`Error fetching user data with error ${error}`)
    }
    return [];
}

const parseUsers = async (users, start, limit) => {
    let paginatedData = users.slice(start, limit).map((field) => Object.values(field));
    let parsedData = paginatedData.map(userData => {
      let userDataArr = [];
      userData.map(field => {
        if(typeof field == 'object'){
          let parsedFields = Object.values(field);
          userDataArr = userDataArr.concat(parsedFields)
        } else {
          userDataArr.push(field)
        }
      })
      return userDataArr;
    })
    return parsedData;
}

const searchUsers = async(users, searchString = '') => {
    var filteredData = users.filter(({firstName, lastName, FirstName, LastName}) => {
        let firstNameLowerCase = firstName?.toLowerCase() || FirstName?.toLowerCase(),
        lastNameLowerCase = lastName?.toLowerCase() || LastName?.toLowerCase(),
        searchStringLowerCase = searchString.trim().toLowerCase();
        if(firstNameLowerCase.includes(searchStringLowerCase) || lastNameLowerCase.includes(searchStringLowerCase)){
          return true;
        }
      })
    return filteredData;
}

const filterByGender = async(users, searchString = '') => {
  var filteredData = users.filter(({gender}) => {
      if(gender == searchString){
        return true;
      }
    })
  return filteredData;
}

export default {
    login,
    getSurveyData,
    getUsers,
    parseUsers,
    searchUsers,
    filterByGender
}