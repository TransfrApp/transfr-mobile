import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from "axios";
import baseUrl from '../../request-config';
import appStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';

const { height, width } = Dimensions.get('window');

class AccountSetup extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: 'Select Account Type'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            businessType: '',
        }
    }
    componentDidMount() {
        console.log(this.props.store);
    }

    handleSubmit = () => {
        const user = this.props.store.UserStore.user;
        //Update the DB with account type
        axios.patch(`${baseUrl}/user`, {
            "account_type": this.state.businessType,
            "id": 13
        }).then(response => {
            user.accountType = this.state.businessType;
            this.props.navigation.navigate('Main');
        }).catch(err => console.log(err));
    }

    render() {

        var radio_props = [
            { label: 'Consumer', value: 'consumer' },
            { label: 'Merchant', value: 'merchant' }
        ];

        return (
            <ImageBackground source={require('../../assets/images/background.png')} style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.window}>
                        <Text style={[appStyles.title, { marginBottom: 10, marginTop: 15 }]}>Select Account Type</Text>
                        <TouchableOpacity onPress={() => this.setState({ businessType: 'merchant' })} style={this.state.businessType === "merchant" ? styles.active : styles.radio}>
                            <Text style={this.state.businessType === 'merchant' ? styles.activeText : styles.label}>Merchant</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ businessType: 'consumer' })} style={this.state.businessType === "consumer" ? styles.active : styles.radio}>
                            <Text style={this.state.businessType === 'consumer' ? styles.activeText : styles.label}>Consumer</Text>
                        </TouchableOpacity>
                        <View style={{ height: 100, marginBottom: 15, justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.handleSubmit()} style={appStyles.login}>
                                <Text style={appStyles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    ...appStyles,
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    window: {
        backgroundColor: '#FFF',
        width: width * .5,
        borderRadius: 37,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 5,
        marginBottom: 5
    },
    radio: {
        height: height * 0.08,
        width: width * 0.25,
        borderWidth: 3,
        borderColor: '#979797',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    label: {
        fontSize: 20,
        color: '#6D708A',
        fontWeight: '600'
    },
    active: {
        height: height * 0.08,
        width: width * 0.25,
        borderWidth: 3,
        borderColor: '#693CB7',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    activeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#693CB7'
    }
})

export default inject("store")(observer(AccountSetup));