import {
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

const appStyles = {
topNavIconRight: {
    height: 20,
    width: 20,
    marginRight: 15
},
textInput: {
    width: width * .5,
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
}
}

export default appStyles;