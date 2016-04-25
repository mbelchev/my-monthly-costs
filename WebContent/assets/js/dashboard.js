var user;
$(document).ready(function() {
	if (!(email = Cookies.get('email'))) window.location.replace('index.html');
	else {
		getUser(email).success(function(msg) {
			user = msg[0];
			
			// Show dashboard content
			$('body').removeClass('none');
	
			// Set logged in email in navbar
			$('#user-email').text(user.email);

			setBudget();
			setLeftMoney();
			setCategories();
			setExpenses();
		});
		
		// Logout
		$('#logout').on('click', function() { logout(); });
	}
});

function setExpenses() {
	$('.expenses').html('');
	
	getExpenses(user.id).success(function(expenses) {
		var data = [];

		if (expenses.length > 0) {
			_.forEach(expenses, function(expense, key) {
				getCatById(expense.cat_id).success(function(category) {
					data.push({
						value: expense.spent,
						color: category[0].color,
						label: category[0].name,
					});
					$(".expenses").append("<tr><td>" + expense.spent + ' ' + user.currency + "</td><td>" + category[0].name + "</td><td>"+expense.date+"</td></tr>");
				}).then(function() {		
					if ((key + 1) == expenses.length) setChart(data);
				});
			});
		} else {
			data.push({value: -1, color: "#ecf0f5", label: "No expenses found!"});
			setChart(data);
			$(".expenses").append('<br /><div class="alert alert-danger">No expenses found</div>');
		}
	});	
}

function setChart(data) {
	new Chart(document.getElementById("pie-chart").getContext("2d")).Pie(data, {responsive : true});	
}

function setLeftMoney() {
	spentMoney = !user.spentMoney ? 0 : user.spentMoney;
	$('#left-money').html((user.budget - spentMoney) + '<br />' + user.currency);
	$('#spentMoney').html(spentMoney + ' ' + user.currency);
	
	$('#easypiechart').attr('data-percent', (user.spentMoney/user.budget)*100);
	
    $('#easypiechart').easyPieChart({
        scaleColor: false,
        barColor: '#f9243f',
        lineWidth: 8,
    });	
}

function setBudget() {
	$('#budget').text(user.budget + ' ' + user.currency);
}

function setCategories() {
	$('.todo-list').html('');
	$('#expenseCategory').html('<option disabled>Select Category</option>');
	
	getCategories(user.id).success(function(categories) {
		if (categories.length > 0) 
			_.forEach(categories, function(category) {
				$('.todo-list').append('<li class="todo-list-item category-item" data-cat-id="'+category.id+'"><div class="checkbox">'+
						'<i class="'+ category.icon +'"></i>'+
						'<label>'+category.name+'</label></div></li>');
				$('#expenseCategory').append('<option value="'+category.id+'">'+category.name+'</option>');
			});
		else $('.todo-list').append('<div class="alert alert-danger">No categories added!</div>');
	});
}

function logout() {
	Cookies.remove('email');
	window.location.replace('index.html');	
}