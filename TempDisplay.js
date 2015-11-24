'use strict';

var React = require('react-native');
var Config = require('./Config');

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

/*var FAKE_BOOK_DATA = [
    {volumeInfo: {title: 'The Catcher in the Rye', authors: "J. D. Salinger", imageLinks: {thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
];*/
var deviceHeight = require('Dimensions').get('window').height;


//var REQUEST_URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=jp';

const MULTI_URL = 'https://api.particle.io/v1/devices/' + Config.device + '/multi/?access_token=' + Config.token;
//const HUMIDITY_URL = 'https://api.particle.io/v1/devices/53ff71066667574808382467/humidity?access_token='+token;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20b4e3',//f77d77',
        padding: 10,
        height: deviceHeight-48
    },
    icon: {
	    opacity: 0.8

    },
    largeText: {
	    fontSize: 24,
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        //flex: 1,
		borderBottomColor: 'rgba(0,0,0,0.3)',
		borderTopColor: 'rgba(255,255,255,0.4)',
		borderLeftColor: 'rgba(150,150,150,0.2)',
		borderRightColor:  'rgba(150,150,150,0.2)',
	    borderStyle: 'solid',
	    borderWidth: 1,
	    height: 160,
	    width: 160,
	    borderTopRightRadius: 80,
        borderBottomLeftRadius: 80,
	    backgroundColor: 'rgba(0,0,0,0.1)',
	    shadowColor: 'black',
	    shadowOffset: {width:10, height:10},
	    shadowOpacity: 0.3,
	    shadowRadius: 10,
	    alignItems: 'center',
	    justifyContent: 'center',
	    marginTop: 100
    },
    celcius: {
        fontSize: 50,
        fontFamily: 'BentonSans',
        marginBottom: 0,
        padding:10,
        color: 'white'
    },
    farenheit: {
	    fontSize: 20,
	    fontFamily: 'BentonSans',
        color: '#cccccc'
    },
    separator: {
	    height: 1,
	    backgroundColor: '#dddddd'
    },
    listView: {
	    flex: 1,
	    height: 500,
    },
    quoteView:{
	    flex: 1,
	    height: 300
    }, 
    loading: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center'
    },
    button: {
	    borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 50,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    refreshWrapper: {
	    margin: 50,
	    borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
	    shadowColor: 'black',
	    shadowOffset: {width:10, height:10},
	    shadowOpacity: 0.3,
	    shadowRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'BentonSans',
        color: '#44daf1',
        alignSelf: 'center'
    },
    errorBox: {	   
	    height:30,
	  	padding:10
    },
    backgroundImage: {
    	flex: 1,
		resizeMode: 'cover', // or 'stretch'
		position: 'absolute',
		height:580,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
  	}
    
});


class TempDisplay extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isError: false,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})
		}
	}
	componentDidMount() {
		this.fetchTempData();
		//var self;
		//this.fetchHumidityData();
	}
	fetchTempData() {
		this.setState({ isLoading: true });
		var self = this;
		var data = [];
		fetch(MULTI_URL)
		.then((response) => response.json())//.json())
		.then((responseData) => {
			console.log(responseData);
			data[0] = JSON.parse(responseData.result);
			console.log(data);
			this.setState({
				dataSource: self.state.dataSource.cloneWithRows(data),
				isLoading: false
			});			
		})
    	.catch(function(err) {
	    	console.log('fetch failed', err);
    		self.setState({isLoading: false, isError: true})
    		self.renderErrorView();
    	})
		.done();
	}
	renderErrorView() {
		return (
			<View style={styles.container}>
				<View style={styles.loading}>
					<Text style={styles.largeText}>Oops!</Text>
					<Text>
						Either you have no internet connection or your Particle is not online!
					</Text>
				</View>
				<View style={styles.refreshWrapper}>
					<TouchableHighlight style={styles.button}
							underlayColor='#f1c40f'
							onPress={this.doRefresh.bind(this)}
							>
                		<Text style={styles.buttonText}>Try Again</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
	
	
//<Image source={{uri: 'http://www.julianrohn.com/wp-content/uploads/2013/11/06_lauterbrunnen_1280x800-110802.jpg'}} style={styles.backgroundImage} />

	renderDisplay(data) {
		console.log(data.temp);

		function CtoF(ctemp) {
			return ctemp*9/5+32;
		}
		var ftemp = CtoF(data.temp);
		    
		return (
			
				<View>
				
					<View style={styles.container}>

			            <View style={styles.rightContainer}>
																            	
			                <Text style={styles.celcius}>{parseFloat(data.temp).toFixed(1)} &#176;</Text>
			                <Text style={styles.farenheit}>{parseFloat(ftemp).toFixed(1)} &#176;</Text>
			               			                
						</View>
						<View>
							<Text style={styles.farenheit}>{parseFloat(data.humidity).toFixed(1)} %</Text>
						</View>							
						<View style={styles.separator}/>
						<View style={styles.refreshWrapper}>
							<TouchableHighlight style={styles.button}
									underlayColor='#f1c40f'
									onPress={this.doRefresh.bind(this)}
									>
	                    		<Text style={styles.buttonText}>refresh</Text>
							</TouchableHighlight>
						</View>
						<View>
							<Text style={styles.errorBox}>{(this.isError) ? data.error : ' '}</Text>
						</View>
					</View>
					
				</View>
				
		);
	}
	doRefresh() {
		this.setState({isLoading: true, isError: false});
        this.fetchTempData();
        //this.fetchHumidityData();
    }

   
	render() {
		if (this.state.isLoading & !this.state.isError) {
			return this.renderLoadingView();	
		}
		else if (this.state.isError) {
			return this.renderErrorView();
		}
	    return (
	        <ListView dataSource={this.state.dataSource}
	            renderRow={this.renderDisplay.bind(this)}
	            style={styles.listView}
			/>
	    );
	}
	
	renderLoadingView() {
		return (
			<View style={styles.container}>
				<View style={styles.loading}>
					<ActivityIndicatorIOS
						size='large'/>
					<Text>
						Loading Data...
					</Text>
				</View>
			</View>
		);
	}
}

module.exports = TempDisplay;