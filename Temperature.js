'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
//var Button = require('Button');
var TempDisplay = require('./TempDisplay');

var {
  StyleSheet,
  NavigatorIOS,
  Navigator,
  Component,
  Menu
} = React;


/*<Image source={speechBubbleIcon} />*/

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
  },
});
  
class Temperature extends Component {

	render() {
		return (
		<NavigatorIOS style={styles.container}
		initialRoute = {{
			title: 'TenTen Temperature',
			component: TempDisplay,
		}}
		/>
		);
	}
	/*var menu = <Menu navigator={navigator}/>;

	
	render() {

    return (
	      <SideMenu menu={menu}>
	        <ContentView/>
	      </SideMenu>
	    );
    }*/
}

module.exports = Temperature;



