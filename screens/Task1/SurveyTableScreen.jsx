import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar, Table } from "../../components";
import MainContoller from "../../controllers/MainContoller";
import helper from '../../helpers/helper';

const widthArr = [200, 200, 200, 200, 200, 200, 250];

export default function SurveyTableScreen() {
  const [searchString, setSearchString] = useState("");
  const [surveyData, setSurveyData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const surveyData = await MainContoller.getSurveyData();
    if (surveyData) {
      setSurveyData([...surveyData]);
      let paginatedData = surveyData.slice(start, limit).map((field) => Object.values(field));
      setPaginatedData([...paginatedData]);
      setHeaders([...Object.keys(surveyData[0])]);
      setLoading(false);
      setEnd(surveyData.length)
    }
  };

  const handlePaginate = async (direction) => {

    let { startLimit, endLimit } = await helper.getPaginateValues(start, limit, direction)

    if(searchString === ''){
      let paginatedData = surveyData.slice(startLimit, endLimit).map((field) => Object.values(field));
      setPaginatedData([...paginatedData]);
      setStart(startLimit);
      setLimit(endLimit);
      setEnd(surveyData.length)
    }else {
      handleSearchByName(searchString, true, direction)
    }
  };

  const handleSearchByName = async(text, increase = false, direction) => {
    setSearchString(text);

    let filteredData = await MainContoller.searchUsers(surveyData, text)

    let { paginatedData, startLimit, endLimit } = await helper.getPaginatedDataAndValues(text, filteredData, increase, direction, start, limit)

    if(paginatedData.length > 0){
      setPaginatedData([...paginatedData])
      setStart(startLimit)
      setLimit(endLimit)
    }
    setEnd(filteredData.length)
  };

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
});
