import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";
import Button from "./Button";

export default ({buttonLabel, buttonOnPress, tableHeaders, tableData, widthArr}) => {
  return (
    <ScrollView>
      <Button
        label={buttonLabel}
        styleProps={styles.button}
        onPress={buttonOnPress}
      />
      <ScrollView horizontal={true}>
        <Table borderStyle={styles.tableContainer}>
          <Row
            data={tableHeaders}
            widthArr={widthArr}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows
            widthArr={widthArr}
            data={tableData}
            textStyle={styles.TableText}
          />
        </Table>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "lightblue",
  },
  TableText: {
    margin: 10,
  },
  textinput: {
    marginVertical: 20,
    borderRadius: 10,
    borderColor: "blue",
    borderWidth: 1,
    width: 200,
  },
  tableContainer: {
    borderWidth: 1, 
    borderColor: "#ffa1d2" 
  }
});

