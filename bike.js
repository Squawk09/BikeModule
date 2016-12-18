/* global Module 
 * By Philip Sigillito psigillito@gmail.com
 */

Module.register("bike",{
	
	defaults: {
		
	},
	
	getScripts: function() {
		return ["moment.js"];
	},
	
	start: function() {
		this.bikepic = this.file('bikeimg.jpg');
		this.temp = ''; 
		this.wind = '';
		this.works = '';
		this.time = '';
		this.isOk=false;
		this.badNotification = '';
		
		
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 3000);

		moment.locale(config.language);
	},

	getDom: function() {
		var testWrapper = document.createElement("div");
		var wrapper = document.createElement("div");
		var myImage = document.createElement("img");
		myImage.src=this.bikepic;
		
		if( this.isOk==true){
			wrapper.appendChild(myImage);
		}else{
			testWrapper.innerHTML=this.badNotification;
			wrapper.appendChild(testWrapper);
		}
		
		return wrapper;
	},
	
	notificationReceived: function(notification, payload, sender) {
		if (notification === 'temperature') {
			var currentweather = payload;
			if ( currentweather && currentweather.hasOwnProperty('temperature') ) {
				this.temp = currentweather.temperature;
				this.wind = currentweather.wind;
				this.works = currentweather.works;
				this.testConditions();
				Log.log('The current temperature is ' + this.temp);
			}
		}
	},
	
	testConditions: function(){
		this.isOk=true;
		this.time = moment().format("HHmm"); 
		if(this.time>600 && this.time<715){
				
			if(this.temp< 50){
				this.badNotification += "It is too cold\n";
				this.isOk=false;
			}
			if(this.temp>80){
				this.badNotification+= "It is too hot\n";
				this.isOk = false;
			}
			if(this.wind>7.9){
				this.badNotification+= "It is too windy\n";
				this.isOk = false;
			}
			if(this.works <800 || this.works > 804){
				this.badNotification +="The weather is bad\n";
				this.isOk = false;
			}
		}else{
			this.isOk=false;
			this.badNotification = "";
		}
		this.updateDom();
	}	
});