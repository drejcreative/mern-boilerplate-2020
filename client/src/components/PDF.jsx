import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  logo: {
    paddingRight: "10px",
    width: 75,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "5px",
  },
  textLabel: {
    width: "35%",
  },
  textValue: {
    width: "65%",
  },
  textHead: {
    textDecoration: "underline",
  },
});

// Create Document Component
const Passes = ({ familyMembers = [], HOFITS, formNo, markaz }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {familyMembers.map((fm, i) => {
        return (
          <View style={styles.section} key={fm.its} break={i !== 0}>
            <Image src={"/logo.png"} style={styles.logo} />
            <View style={styles.wrapper}>
              <View style={styles.textWrapper}>
                <Text style={styles.textLabel}>Form number</Text>
                <Text style={styles.textValue}>{formNo}</Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textLabel}>Markaz</Text>
                <Text style={{ ...styles.textValue, ...styles.textHead }}>
                  {markaz}
                </Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textLabel}>HOF ITS</Text>
                <Text style={styles.textValue}>{HOFITS}</Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textLabel}>Name</Text>
                <Text style={styles.textValue}>{fm.name}</Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textLabel}>ITS</Text>
                <Text style={styles.textValue}>{fm.its}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </Page>
  </Document>
);

export default Passes;
