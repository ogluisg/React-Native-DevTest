import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar, Table } from "../../components";
import MainContoller from "../../controllers/MainContoller";

const widthArr = [100, 100, 100, 100, 100, 100, 250];

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

  const handlePaginate = (direction) => {
    let startLimit = start, endLimit = limit;
    if(direction == 'NEXT'){
      startLimit = startLimit + 5;
      endLimit = endLimit + 5;
    }else {
      if(startLimit >= 5 && endLimit >= 10){
        startLimit = startLimit - 5;
        endLimit = endLimit - 5;
      }
    }

    let paginatedData = [];

    if(searchString === ''){
      paginatedData = surveyData.slice(startLimit, endLimit).map((field) => Object.values(field));
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

    var filteredData = await MainContoller.searchUsers(surveyData, text)

    let paginatedData = [], startLimit = start, endLimit = limit;

    if(text === ''){
      paginatedData = filteredData.slice(0, 5).map((field) => Object.values(field));
    } else {
      if(increase && direction === 'NEXT'){
        startLimit = startLimit + 5,
        endLimit = endLimit + 5;
      }else {
        startLimit = 0;
        endLimit = 5;
      }
      paginatedData = filteredData.slice(startLimit, endLimit).map((field) => Object.values(field));
    }
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
