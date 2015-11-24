var React = require('react-native');
var SideMenu = require('react-native-side-menu');

var Quotations = require('./Temperature');
var Menu = require('./Menu');

var Dimensions =require('Dimensions');

var height = Dimensions.get('window').height;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Component,
  PickerIOS
} = React;

var styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
  },
  button2: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon: {
	  position:'absolute',
	  bottom: height-52,
	  left: 10,
	  height:24,
	  width: 24
  }
});

class Button extends Component {
  handlePress(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}>
        <Text style={this.props.style}>{this.props.children}</Text>
        <Image source={{uri: 'Settings'}} style={styles.icon} />

      </TouchableOpacity>
    );
  }
}

Button.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

class TenTen extends Component {

  constructor(props, ctx) {
		super(props, ctx);
		this.state = {
			touchToClose: false,
			selectedTab: 'temperature'
    	};
	}

  handleOpenWithTouchToClose() {
    this.setState({
      touchToClose: true,
    });
  }

  handleChange(isOpen) {
    if (!isOpen) {
      this.setState({
        touchToClose: false,
      });
    }
  }

  render() {
    return (
      <SideMenu
        menu={<Menu/>}
        touchToClose={this.state.touchToClose}
        onChange={this.handleChange.bind(this)}
        onLayout={(event) => { var {x, y, width, height} = event.nativeEvent.layout; }}>
                
        <TabBarIOS selectedTab={this.state.selectedTab}>
            <TabBarIOS.Item
                    selected={this.state.selectedTab === 'temperature'}
                    //icon={require('image!homeicon')}
                    //systemIcon="most-viewed"
                    //iconName="ios-gear-outline"
					//selectedIconName="ios-gear"
                    icon={{uri:'SpeechBubble'}}


                    onPress={() => {
                        this.setState({
                            selectedTab: 'temperature'
                        });
                    }}>
                    
                    <Quotations/>
                </TabBarIOS.Item>
        </TabBarIOS>
        <Button style={styles.button2}
          onPress={this.handleOpenWithTouchToClose.bind(this)}
          >
          
        </Button>
        <View  />

        
      </SideMenu>
    );
  }
}


AppRegistry.registerComponent('TenTen', () => TenTen);
