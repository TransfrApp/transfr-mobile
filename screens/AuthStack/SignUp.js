import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

class CreateAccount extends Component {
    static navigationOptions = {
        
    }
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text>Welcome to the Sign Up Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})

export default CreateAccount;