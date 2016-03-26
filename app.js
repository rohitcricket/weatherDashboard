//1
var data = {
	"rainfall":{
			"rainDays": 30,
			"rainDaysPrevious": 23,
			"totalDays": 365,
			"volume": 180,
			"volumePrevious": 0
	},
	"temperature":{
			"averageDateTemperature": 70.2,
			"averageMonthTemperature": 72.8,
			"coldestDate": "12/24/2015",
			"coldestDateTemperature": 30,
			"coldestMonth": "December",
			"coldestMonthTemperature": 34,
			"hottestDate": "10/07/2015",
			"hottestMonth": "September",
			"hottestMonthTemperature": 95,
			"hottestDateTemperature": 102
	}
}


$(document).ready(function(){

	//2
	var html = "", htmlClass;
	for(var i=0; i<data.rainfall.totalDays; i++){
		if(i < data.rainfall.rainDays)htmlClass = "rain";
			else htmlClass = "noRain";
		html += "<span class='"+htmlClass+"'></span>";
	}
	$('#report_rainfall [data-component="chart"]').html(html);

	$.each(data.rainfall, function(key, value){
		$('#report_rainfall [data-data="'+key+'"]').html(value);
	});

	//3
	var calculate = {
		"changeAmount": ((data.rainfall.volume/data.rainfall.volumePrevious)*100).toFixed(2),
		"averageAmount": (data.rainfall.volume/data.rainfall.rainDays).toFixed(2)
	}
	if(calculate.changeAmount >= 100){
		calculate.changeAmount = calculate.changeAmount - 100;
		calculate.changeType = "increase";
	}else{
		calculate.changeType = "decrease";
	}
	$.each(calculate, function(key, value){
		$('#report_rainfall [data-calculated="'+key+'"]').html(value);
	});

	//4
	$.each(data.temperature, function(key, value){
		var temperatureRange = data.temperature.hottestDateTemperature - data.temperature.coldestDateTemperature;
		var value = value + (0 - data.temperature.coldestDateTemperature);	//.. adjust value to prepare as percentage
		value = (value/temperatureRange)*100;
		$('#report_temperature [data-label="'+key+'"]').css({"bottom":value+"%"});
	});

	$.each(data.temperature, function(key, value){
		$('#report_temperature [data-data="'+key+'"]').html(value);
	});

	//5
	calculate = {
		"difference_hottestMonthToColdest": (data.temperature.hottestMonthTemperature - data.temperature.coldestMonthTemperature),
		"difference_averageToColdestDay": (data.temperature.averageDateTemperature - data.temperature.coldestDateTemperature),
		"difference_hottestDayToColdest": (data.temperature.hottestDateTemperature - data.temperature.coldestDateTemperature)
	}
	$.each(calculate, function(key, value){
		$('#report_temperature [data-calculated="'+key+'"]').html(value);
	});

});