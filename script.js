'use strict';
$(function(){
	$(document).ready(function(){
	const url='https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/all_patient_v2_prefecture_point_view/FeatureServer/0/query?where=1%3D1&outFields=年,月,日,感染者数,新規感染者数,Name&outSR=4326&f=json';
	let info=[];
	var today = new Date();
	$.ajax({
		url:url,
	})
	.done(function(data){
		let data1=JSON.parse(data);
		$.each(data1.features,function(index, value) {
			if(value.attributes.Name=="北海道"&&(value.attributes.年==today.getFullYear()-1||value.attributes.年==today.getFullYear())&&
			(value.attributes.月==today.getMonth()||value.attributes.月==today.getMonth()+1)){
				info.unshift(value.attributes);	
			}
		})
		let coronaData=info.slice(0,14);
		createChart(coronaData);
	})
	.fail(function(){
		console.log('fail');
	})
})
})

function createChart(coronaData){
	let day=[];
	let infectedPersonData=[];
	$.each(coronaData,function(index, value) {
			day.push(value['月']+'月'+value['日']+'日');
			infectedPersonData.push(value['新規感染者数']);
	})
	var ctx = document.getElementById("myLineChart");
	var myBarChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: [day[13], day[12], day[11], day[10], day[9], day[8],day[7],
					day[6], day[5],day[4], day[3], day[2], day[1],day[0],],
			datasets: [
				{
				label: '北海道のコロナ新規感染者数', 
				data: [infectedPersonData[13],infectedPersonData[12],infectedPersonData[11],infectedPersonData[10],infectedPersonData[9],infectedPersonData[8],infectedPersonData[7],
					infectedPersonData[6],infectedPersonData[5],infectedPersonData[4],infectedPersonData[3],infectedPersonData[2],infectedPersonData[1],infectedPersonData[0]], //グラフのデータ
				borderColor: "rgba(237,26,26,1)",
				backgroundColor: "rgba(237,26,26,1)",
				lineTension: 0,
				fill: false,
				borderWidth: 3
				}
			]
		},
		options: {
			maintainAspectRatio: false,
			title: {
				display: true,
				fontSize: 25,
				text: '北海道の直近2週間のコロナ新規感染者数'
			},
			scales: {
				xAxes: [
					{
						display: true,
						barPercentage: 0.8,
						scaleLabel: {
							display: false,
						},
						gridLines: {
							display: false
						},
						ticks: {
							fontColor: "black",
							fontSize: 18
						},
					}
				],
				yAxes: [{
				display: true,
						barPercentage: 0.8,
						scaleLabel: {
							display: true,
							labelString: 'コロナ新規感染者数',
							fontColor: "black",
							fontSize: 20
						},
						ticks: {        
							min: 0,
							max: 600,
							fontColor: "black",
							fontSize: 20
						},
				}]
			},
			layout: {
				padding: {
					left  : 0,
					right : 0,
					top   : 0,
					bottom: 0
				}
			}
		}
	});
}