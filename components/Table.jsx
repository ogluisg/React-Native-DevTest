import React from "react";
import { ScrollView, StyleSheet, View, Platform} from "react-native";
import { Row, Rows, Table } from "react-native-table-component";
import Button from "./Button";

export default ({buttonOnPress, tableHeaders, tableData, widthArr, limits : { start = 0, end }}) => {
  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
      <Button
        label={'BACK'}
        styleProps={[start === 0 ? styles.inactiveButton : styles.button]}
        disabled={start === 0}
        onPress={() => buttonOnPress('BACK')}
      />
      <Button
        label={'NEXT'}
        styleProps={[end - start <= 5 ? styles.inactiveButton : styles.button]}
        disabled={end - start <= 5}
        onPress={() => buttonOnPress('NEXT')}
      />
      </View>
      <ScrollView horizontal={true} contentContainerStyle={[Platform.OS === 'web' ? styles.tableContainerWeb : {} ]}>
        <Table borderStyle={styles.tableBorderStyle}>
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
  HeadStyle: {
    height: 80,
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
  tableBorderStyle: {
    borderWidth: 1, 
    backgroundColor:'blue',
    borderColor: "#ffa1d2" ,
    alignSelf: 'stretch',

  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  inactiveButton: {
    backgroundColor:'grey'
  },
  tableContainerWeb:{
    width: '100%',
    justifyContent:'center', 
    alignContent:'center', 
    alignItems:'center'
  }
});

