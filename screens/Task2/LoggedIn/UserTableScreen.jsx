import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Modal from 'react-native-modalbox';
import { Button, SearchBar, Table } from "../../../components";
import authContext from '../../../contexts/authContext';
import MainContoller from "../../../controllers/MainContoller";
import helper from '../../../helpers/helper';

const widthArr = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

const headersArr = ['email', 'gender', 'phone', 'birthdate', 'street', 'city', 'state', 'postcode', 'username', 'password', 'firstname', 'lastname', 'title', 'picture']

export default function SurveyTableScreen() {
  const [searchString, setSearchString] = useState("");
  const [userData, setUserData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [displayModal, setDisplayModal] = useState(false);
  const [filter, setFilter] = useState({gender: ''})
  const { token } = useContext(authContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilterByGender()
  },[filter])

  const filterButtons = [
    {
      label: 'Male',
      onValueChange: () => toggleSwitch('male'),
      value: filter.gender === 'male'
    },
    {
      label: 'Female',
      onValueChange: () => toggleSwitch('female'),
      value: filter.gender === 'female'
    }
  ]

  const fetchData = async () => {
    const users = await MainContoller.getUsers(token)
    if (users) {
      let parsedUserData = await MainContoller.parseUsers(users, start, limit)
      setUserData([...users])
      setPaginatedData([...parsedUserData]);
      setHeaders([...headersArr]);
      setLoading(false);
      setEnd(users.length)
    }
  };

  const handlePaginate = async(direction) => {
    let filteredData = userData;
    
    let { startLimit, endLimit } = await helper.getPaginateValues(start, limit, direction)

    if(filter.gender !== ''){
      filteredData = await MainContoller.filterByGender(filteredData, filter.gender)
    }

    if(searchString === ''){
      let paginatedData = await MainContoller.parseUsers(filteredData, startLimit, endLimit)
      setPaginatedData([...paginatedData]);
      setStart(startLimit);
      setLimit(endLimit);
      setEnd(filteredData.length)
    }else {
      handleSearchByName(searchString, true, direction)
    }
  };

  const handleDisplayModal = () => {
    setDisplayModal(!displayModal)
  }

  const handleSearchByName = async(text, increase = false, direction) => {

    setSearchString(text);

    var filteredData = await MainContoller.searchUsers(userData, text)

    if(filter.gender !== ''){
      filteredData = await MainContoller.filterByGender(filteredData, filter.gender)
    }

    let { paginatedData, startLimit, endLimit } = await helper.getPaginatedDataAndValues(text, filteredData, increase, direction, start, limit, true)

    setPaginatedData([...paginatedData])
    setStart(startLimit)
    setLimit(endLimit)
    setEnd(filteredData.length)
  };

  const handleFilterByGender = async () => {
    let paginatedData = [];
    let filteredData = await MainContoller.searchUsers(userData, searchString)
    if(filter.gender !== ''){
      filteredData = await MainContoller.filterByGender(filteredData, filter.gender)
    }
    paginatedData = await MainContoller.parseUsers(filteredData, start, limit)
    setPaginatedData([...paginatedData])
  }

  const toggleSwitch = (gender) => {
    if(filter.gender == gender){
      setFilter({gender: ''})
    }else {
      setFilter({gender})
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Fetching data...</Text>
      ) : (
        <>
          <SearchBar
            keyword={searchString}
            handleSearchKeyword={handleSearchByName}
            placeholder={"Search by name..."}
          />
          <Table
            limits={{start, end}}
            tableHeaders={headers}
            tableData={paginatedData}
            widthArr={widthArr}
            buttonOnPress={handlePaginate}
          />
          <Button 
            label={'Filters'}
            onPress={handleDisplayModal}
          />
          <Modal 
            swipeArea={150}
            isOpen={displayModal}
            onClosed={() => setDisplayModal(false)}
          >
          
            <View style={styles.modalContainer}>

              <Text>Filter by</Text>

              <View style={styles.filterButtonsContainer}>

              {filterButtons.map(filterButton => 
                 <View key={filterButton.label} style={styles.toggleContainer}> 
                 <Text>{filterButton.label}</Text>
                 <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={filterButton.onValueChange}
                    value={filterButton.value}
                 />
                 </View>
              )}

            </View>
              <Button 
                label={'Hide Filters'}
                onPress={handleDisplayModal}
              />
            </View>

          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  modalContainer: {
    backgroundColor:'white',
    alignItems:'center', 
    borderWidth: 1, 
    padding: 10, 
    margin: 50, 
    borderRadius: 10, 
    height: 200
  },
  toggleContainer: {
    marginHorizontal: 10
  },
  filterButtonsContainer:{
    paddingVertical: 25, 
    flexDirection:'row'
  }
});
