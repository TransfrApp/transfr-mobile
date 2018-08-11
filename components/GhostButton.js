import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

class GhostButton extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            placeholder: '',
        }
    }

    onPress = () => {
        this.props.onPress();
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.onPress()} style={styles.button}>
                <Text style={styles.btnText}>Testing Ghost GhostButton</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: width * .5,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        borderRadius: 19,
        borderWidth: 2,
        borderColor: 'black' 
    },
    btnText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    }
})

export default GhostButton;