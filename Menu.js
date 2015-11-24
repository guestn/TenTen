const React = require('react-native');
const Dimensions = require('Dimensions');
const Storage = require('./Storage');

const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  Button,
  TouchableHighlight,
  PickerIOS,
  AsyncStorage
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  button: {
	  width:120,
	  padding: 20,
	  backgroundColor: '#dddddd',
	  borderRadius: 5,
	  justifyContent: 'center',
      alignItems: 'center',
  },
  buttonPressed: {
	  width:120,
	  padding: 20,
	  backgroundColor: '#ff7777',
	  borderRadius: 5,
	  justifyContent: 'center',
      alignItems: 'center',
  },
});


var TempSelector = React.createClass({
	
	getInitialState: function(){
        return {
            style: styles.button,
            text: 'Celcius'
        };
    },
	
	render() {
		return (
			<TouchableHighlight style={this.state.style} onPress={this.handlePress}>
		    	<Text>{this.state.text}</Text>
			</TouchableHighlight>
		);
	},
	
	handlePress(event) {
		if (this.state.style === styles.button){
            this.setState({style: styles.buttonPressed, text: 'Farenheit'});
        } else {
            this.setState({style: styles.button, text: 'Celcius'});
        }
	},
});

var PickerItemIOS = PickerIOS.Item;

var STORAGE_KEY = '@AsyncStorageExample:key';
var COLORS = ['Celcius', 'Fahrenheit'];

var BasicStorageExample = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({selectedValue: value});
        this._appendMessage('Recovered selection from disk: ' + value);
      } else {
        this._appendMessage('Initialized with no selection on disk.');
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  },

  getInitialState() {
    return {
      selectedValue: COLORS[0],
      messages: [],
    };
  },

  render() {
    var color = this.state.selectedValue;
    return (
      <View>
        <PickerIOS
          selectedValue={color}
          onValueChange={this._onValueChange}>
          {COLORS.map((value) => (
            <PickerItemIOS
              key={value}
              value={value}
              label={value}
            />
          ))}
        </PickerIOS>
        <Text>
          {'Selected: '}
          <Text style={{color}}>
            {this.state.selectedValue}
          </Text>
        </Text>
        <Text>{' '}</Text>
        <Text onPress={this._removeStorage}>
          Press here to remove from storage.
        </Text>
        <Text>{' '}</Text>
        <Text>Messages:</Text>
        {this.state.messages.map((m) => <Text>{m}</Text>)}
      </View>
    );
  },

  async _onValueChange(selectedValue) {
    this.setState({selectedValue});
    try {
      await AsyncStorage.setItem(STORAGE_KEY, selectedValue);
      this._appendMessage('Saved selection to disk: ' + selectedValue);
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  },

  async _removeStorage() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      this._appendMessage('Selection removed from disk.');
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  },

  _appendMessage(message) {
    this.setState({messages: this.state.messages.concat(message)});
  },
});

exports.title = 'AsyncStorage';
exports.description = 'Asynchronous local disk storage.';
exports.examples = [
  {
    title: 'Basics - getItem, setItem, removeItem',
    render(): ReactElement { return <BasicStorageExample />; }
  },
];




module.exports = class Menu extends Component {
  render() {

    return (
      <ScrollView style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Settings</Text>
        </View>
        <Text>Select Primary Temperature View:</Text>
        <TempSelector>
        </TempSelector>

        <Text style={styles.item}>About</Text>
        <Text style={styles.item}>Contacts</Text>
        <BasicStorageExample />
      </ScrollView>
    );
  }
}