var pieData = [
	{
		value: 300,
		color:"#30a5ff",
		highlight: "#62b9fb",
		label: "Blue"
	},
	{
		value: 50,
		color: "#ffb53e",
		highlight: "#fac878",
		label: "Orange"
	},
	{
		value: 100,
		color: "#1ebfae",
		highlight: "#3cdfce",
		label: "Teal"
	},
	{
		value: 120,
		color: "#f9243f",
		highlight: "#f6495f",
		label: "Red"
	}
];


window.onload = function(){
	window.myPie = new Chart(document.getElementById("pie-chart").getContext("2d")).Pie(pieData, {responsive : true
	});
};