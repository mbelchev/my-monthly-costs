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
		$('#btn-todo').on('click', function() {
			postCategory($('#btn-input').val(), user.id).success(function() {
				console.log('added successfully');
				setCategories();
			});
		});
	}
});

function setExpenses() {
	$('.expenses').html('');
	
	getExpenses(user.id).success(function(expenses) {
		var data = [];
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
	});	
}

function setChart(data) {
	new Chart(document.getElementById("pie-chart").getContext("2d")).Pie(data, {responsive : true});	
}

function setLeftMoney() {
	$('#left-money').html((user.budget - user.spentMoney) + '<br />' + user.currency);
	$('#spentMoney').html(user.spentMoney + ' ' + user.currency);
	
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
		_.forEach(categories, function(category) {
			$('.todo-list').append('<li class="todo-list-item category-item" data-cat-id="'+category.id+'"><div class="checkbox">'+
					'<i class="'+ category.icon +'"></i>'+
					'<label>'+category.name+'</label></div></li>');
			$('#expenseCategory').append('<option value="'+category.id+'">'+category.name+'</option>');
		});
	});
}

function logout() {
	Cookies.remove('email');
	window.location.replace('index.html');	
}