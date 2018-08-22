import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
import authStyles from '../../Styles/authStyles';
import { DrawerItems } from 'react-navigation';
import { observer, inject } from 'mobx-react';

const { width, height } = Dimensions.get('window');

class DrawerHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
        }
    }

    componentDidMount(){
        console.log("Props", this.props);
    }

    render() {
        const drawerProps = this.props.drawerProps;
        const iconFill = this.props.store.UserStore.user.username.split('')[0];
        return (
            <View>
                <ImageBackground
                    style={{ height: 150, width: 320, justifyContent: 'center', alignItems: 'center' }}
                    source={require('../../assets/images/headerBackground.png')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.icon}>
                            <Text style={{ color: 'white', fontSize: 36 }}>{iconFill}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 28, textAlign: 'left' }}>{this.props.store.UserStore.user.username}</Text>
                            <Text style={{ fontSize: 15, color: 'white', textAlign: 'left' }}>{this.props.store.UserStore.user.email}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <DrawerItems {...drawerProps} />
                <View style={{justifyContent: 'flex-end', alignItems: 'center', height: height * .5,}}>
                    <TouchableOpacity onPress={() => this.props.drawerProps.navigation.navigate('Auth')} style={authStyles.login}>
                        <View style={{ flexDirection: 'row', height: 100, width: 187, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{height: 23, width: 30, marginRight: 10}} source={require('../../assets/images/logoutIcon.png')} />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: '300'}}> Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: '#6AC8FF'
    },
})

export default inject("store")(observer(DrawerHeader));