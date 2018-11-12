import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from "victory-native"
import { BoxShadow } from "expo-react-native-shadow"
import images from '../../assets/Images.js';
import appStyles from '../../constants/Styles.js';
import metricServices from '../../Service/metricsServices.js';

const {width, height} = Dimensions.get('window');

import { observer, inject } from 'mobx-react';

class MetricsMainPage extends React.Component {
  static navigationOptions = {
    headerTitle: 'Metrics Dashboard',
    headerRight: (
      <TouchableOpacity>
        <Image style={appStyles.topNavIconRight} source={images.plus}/>
      </TouchableOpacity>
    )
  };

  constructor(props){
    super(props);
    this.state = {
      drawerActive: false,
      products: [],
    }
  }

  calculateDailyRevenue = () => {
    const transactions = this.props.store.BusinessStore.filterCompletedTransactions('Day');
    let total;
    if (!transactions.length){
      return total = 0;
    } else {
      total = transactions.reduce((accum, value) => {
        return accum + value.amount;
      },0);
    }
    return total.toFixed(2);
  }

  calculateWeeklyRevenue = () => {
    const transactions = this.props.store.BusinessStore.filterCompletedTransactions('Week');
    const total = transactions.reduce((accum, value) => {
      return accum + value.amount;
    },0);
    return total.toFixed(2);
  }

  switchTopProdUI(productHeaders, itemTotals, testData){
    // test data is just placeholder data to try different scenarios
    if (itemTotals.length){
      console.log("Product Headers", productHeaders);
      return productHeaders.map(header => (
        <View style={styles.columnView}>
          <Text style={styles.productTableHeader}>{header.text}</Text>
          {itemTotals.map(product => <Text style={styles.productTableText}>{product[header.property]}</Text>)}
        </View>
      ))
    } else {
      return(
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>You don't have any sales data yet.</Text>
        </View>
      )
    }
  }

  render() {
    const business = this.props.store.BusinessStore.business;

    const chartContainerHeight = height * 0.40

    const cardContainerWidth = width * 0.35
    const cardWidth = cardContainerWidth * 0.80
    const cardHeight = chartContainerHeight * 0.45

    const shadowOpt = {
      width: cardWidth,
      height: cardHeight,
      color: "#af62f4",
      border: 2,
      radius: 12,
      opacity: 0.8,
      x: 0,
      y: 3,
      style: { marginVertical: 5 }
  }

    const productHeaders = [
      {
        text: "Product Name",
        property: "name",
      },
      {
        text: "Average Price",
        property: "price",
      },
      {
        text: 'Total Revenue',
        property: "total"
      },
      {
        text: "Items Sold",
        property: "quantity",
      },
    ]
    const products = [
      {
        name: "Coffee",
        price: 112,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Body Spray",
        price: 31,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Noodles",
        price: 25,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Coconut Oil",
        price: 54,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Soup",
        price: 76,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Pizza",
        price: 42,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Television",
        price: 239,
        quantity: 521,
        revenue: 521,
      },
      {
        name: "Burger",
        price: 25,
        quantity: 521,
        revenue: 521,
      },
    ]

    const backgroundColor = "#F5F9FB"

    const weeklyRevenue = this.calculateWeeklyRevenue();
    const dailyRevenue = this.calculateDailyRevenue();
    const topProducts = metricServices.findTopProducts(business.completedTransactions);
    const {itemTotals, transactionsByItem} = topProducts;
    return (
      <View style={styles.container}>

        <View style={{flexDirection: "row", height: height * 0.40}}>
          <View style={{width: width * 0.55, backgroundColor: "white", borderRadius: 12, padding: 15}}>
            <Text style={styles.cardHeaderText}>Sales Summary</Text>
            <View style={{justifyContent: "center", alignItems: "center", width: width * 0.55}}>
              <VictoryChart
                width={width * 0.55}
                height={chartContainerHeight * 0.9}
                maxDomain={{ y: 30000 }}
                padding={{left: 65, right: 50, top: 20, bottom: 50}}
              >
                <VictoryAxis
                  style={{
                      axis: {stroke: "#ededed"},
                      grid: { stroke: "#ededed" },
                      tickLabels: {fontSize: 14, fontWeight: "200", fill: "#464a77" }
                    }}
                />
                <VictoryAxis dependentAxis
                  tickFormat={(t) => `$ ${t}`}
                  style={{
                    axis: {stroke: "#ededed"},
                    grid: { stroke: "#ededed" },
                    tickLabels: {fontSize: 14, fontWeight: "200", fill: "#464a77" }
                  }}
                />
                <VictoryLine
                  interpolation="natural"
                  data={[
                    { x: "Sun", y: 0 },
                    { x: "Mon", y: 12000 },
                    { x: "Tue", y: 4000 },
                    { x: "Wed", y: 12000 },
                    { x: "Thu", y: 7000 },
                    { x: "Fri", y: 4000 },
                    { x: "Sat", y: 10000 },
                  ]}
                  style={{
                    data: { stroke: "#bb87ea", strokeWidth: 2 },
                  }}
                />
              </VictoryChart>
            </View>
          </View>
            <View style={{width: cardContainerWidth, justifyContent: "space-between", alignItems: "center"}}>

              <View style={{width: cardWidth, height: cardHeight, backgroundColor: "#bb87ea", borderRadius: 12, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 50, fontWeight: "bold", color: "white"}}>{`$${dailyRevenue}`}</Text>
                <Text style={{fontSize: 14, fontWeight: "200", color: "white"}}>Today's Revenue</Text>
              </View>

                <BoxShadow setting={shadowOpt}>
                  <View style={{width: cardWidth, height: cardHeight, backgroundColor: "white", borderRadius: 12, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 50, fontWeight: "bold", color: "#7f36ba"}}>{`$${weeklyRevenue}`}</Text>
                    <Text style={{fontSize: 14, fontWeight: "200", color: "#7f36ba"}}>Revenue this week</Text>
                  </View>
                  </BoxShadow>
            </View>
        </View>

        <View style={{flexDirection: "row", width: width * 0.90, height: height * 0.40, marginTop: 20}}>
          <View style={{width: width * 0.25, padding: 15, borderRadius: 12, backgroundColor: "white"}}>
            <Text  style={styles.cardHeaderText}>Top Payment Methods</Text>
            <View style={{justifyContent: "center", alignItems: "center", width: width * 0.30}}>

              <VictoryChart
                height={height * 0.30}
                width={width * 0.30}
                padding={{left: 65, right: 85, top: 20, bottom: 0}}
                domainPadding={{ x: 50, y: [0, 20] }}
              >
                <VictoryBar
                  style={{
                    data: { fill: "#7f36ba" },
                  }}
                  data={[
                    { x: "ETH", y: 30000 },
                    { x: "REQ", y: 60000 },
                    { x: "KNC", y: 100000 },
                    { x: "DGX", y: 30000 },
                    { x: "DAI", y: 60000 },
                    { x: "NEO", y: 100000 },
                  ]}
                />
                <VictoryAxis dependentAxis
                  tickFormat={(t) => `$ ${t}`}

                  style={{
                    axis: { stroke: "none", fill: "none" },
                    tickLabels: {fontSize: 13, fontWeight: "200", fill: "#464a77" }
                  }}/>
                <VictoryAxis
                  tickFormat={(t) => ''}
                  style={{
                    axis: { stroke: "none", fill: "none" },
                    
                  }}/>
              </VictoryChart>

              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 7, marginLeft: width * 0.0685, width: width * 0.135}}>
                  {business.paymentMethods.map(coin => <Image style={{ height: 16, width: 16 }} source={coin.image} />)}
              </View>
          </View>
          <View style={{width: width * 0.60, padding: 15, marginLeft: width * 0.02, backgroundColor: "white", borderRadius: 12}}>
            <Text  style={styles.cardHeaderText}>Top Products</Text>
              <ScrollView contentContainerStyle={styles.rowView}>
                  {this.switchTopProdUI(productHeaders, itemTotals, products)}
              </ScrollView>

          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FB',
  },
  products: {
    width: width *.65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addProduct: {
    height: 200,
    width: 200,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
  },
  mainText: {
    fontSize: 20,
    color: '#B1B5C2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#B1B5C2',
    paddingTop: 10,
    paddingBottom: 20,
  },
  checkout:{
    width: width * .35,
  },
  cardHeaderText: {
    fontSize: 20,
    color: "#464a77",
  },
  checkoutContainer: {
    backgroundColor: 'white',
    height: height * .85,
    width: width * .32,
    flexDirection: 'column'
  },
  checkoutTitle: {
    textAlign: 'center', 
    fontSize: 19, 
    justifyContent: 'flex-start',
    paddingTop: 10,
    color: '#6D708A',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnView: {
    flexDirection: 'column',
  },
  productTableHeader: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 18,
    color: "#464a77"
  },
  productTableText: {
    marginTop: 10,
    marginBottom: 10,
    color: "#464a77",
  },
  placeholder: {
   width: width * 0.60,
   height: height * .3,
   alignItems: 'center',
   justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#B1B5C2',
  }
});

export default inject("store")(observer(MetricsMainPage));