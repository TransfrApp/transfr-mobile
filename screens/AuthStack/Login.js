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

class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text>Welcome to the Login Page</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
                    <Text>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateAccount')}>
                    <Text>Go to Sign Up</Text>
                </TouchableOpacity>
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

export default LoginScreen;