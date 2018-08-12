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
import images from '../../assets/Images.js';
import appStyles from '../../constants/Styles.js';
const {width, height} = Dimensions.get('window');

import { observer, inject } from 'mobx-react';
import victoryAxis from 'victory-native/lib/components/victory-axis';

@inject('store')
@observer
export default class MetricsMainPage extends React.Component {
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

  render() {
    const business = this.props.store.BusinessStore.business;

    const chartContainerHeight = height * 0.40

    const cardContainerWidth = width * 0.35
    const cardWidth = cardContainerWidth * 0.80
    const cardHeight = chartContainerHeight * 0.45

    return (
      <View style={styles.container}>

        <View style={{flexDirection: "row", height: height * 0.40, borderWidth: 2, borderColor: "red"}}>
          <View style={{width: width * 0.55, borderWidth: 2, borderColor: "black"}}>
            <Text>LEFT CHART</Text>
            <View style={{justifyContent: "center", alignItems: "center", width: width * 0.55}}>
              <VictoryChart
                width={width * 0.50}
                height={chartContainerHeight * 0.9}
                maxDomain={{ y: 30000 }}
                padding={{left: 65, right: 50, top: 50, bottom: 50}}
              >
                <VictoryAxis
                  style={{
                      axis: {stroke: "#ededed"},
                      grid: { stroke: "#ededed" },
                    }}
                />
                <VictoryAxis dependentAxis
                  tickFormat={(t) => `$ ${t}`}
                  style={{
                    axis: {stroke: "#ededed"},
                    grid: { stroke: "#ededed" },
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
          <View style={{width: cardContainerWidth, borderWidth: 2, borderColor: "blue", justifyContent: "space-between", alignItems: "center"}}>
            <View style={{width: cardWidth, height: cardHeight, backgroundColor: "#bb87ea", borderRadius: 12, justifyContent: "center", alignItems: "center"}}>
              <Text style={{fontSize: 50, fontWeight: "bold", color: "white"}}>$5541</Text>
              <Text style={{fontSize: 10, fontWeight: "200", color: "white"}}>Today's Revenue</Text>
            </View>
            <View style={{width: cardWidth, height: cardHeight, backgroundColor: "white", borderRadius: 12, justifyContent: "center", alignItems: "center"}}>
              <Text style={{fontSize: 50, fontWeight: "bold", color: "#7f36ba"}}>$65656</Text>
              <Text style={{fontSize: 10, fontWeight: "200", color: "#7f36ba"}}>Revenue this week</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: "row", height: height * 0.40, borderWidth: 2, borderColor: "red"}}>
          <View style={{width: width * 0.30, borderWidth: 2, borderColor: "black"}}>
            <Text>TOP PAYMENT METHODS</Text>
            <View style={{justifyContent: "center", alignItems: "center", width: width * 0.30}}>

              <VictoryChart
                height={height * 0.38}
                width={width * 0.30}
                padding={{left: 65, right: 50, top: 50, bottom: 50}}
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
              </VictoryChart>

              </View>
            
          </View>
          <View style={{width: width * 0.60, borderWidth: 2, borderColor: "blue"}}>
            <Text>TOP PRODUCTS</Text>
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
    backgroundColor: '#f5f9fb'
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
  }
});
