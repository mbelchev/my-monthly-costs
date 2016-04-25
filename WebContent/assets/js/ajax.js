var ENDPOINT = 'http://localhost:3000/';
var DB = {
	'users': ENDPOINT + 'users/',
	'categories': ENDPOINT + 'categories/',
	'expenses': ENDPOINT + 'expenses/',
};


function setUser() {
	$.post(DB.users, {
		email: $('.register-form input[name="form-email"]').val(),
		password: $('.register-form input[name="form-password"]').val(),
		budget: 0,
		currentMoney: 0,
		currency: "BGN",
	});
}

function checkEmail(email) {
    return $.get(DB.users, {
    	email: email,
    });
}

function checkUser(email, password) {
	return $.get(DB.users, {
		email: email,
		password: password,
	});
}

// Dashboard functions

function getUser(email) {
	return $.get(DB.users, {
		email: email
	})
}

function getExpenses(userId) {
	return $.get(DB.expenses, {
		user_id: userId,
	});
}

function getCategories(userId) {
	return $.get(DB.categories, {
		added_by: userId,
	});
}

function getCatById(catId) {
	return $.get(DB.categories, {
		id: catId,
	});
}

function getCatByNameAndUser(catName, userId) {
	return $.get(DB.categories, {
		name: catName,
		added_by: userId,
	});
}

function postCategory(catName, catColor, catIcon, userId) {
	return $.post(DB.categories, {
		name: catName,
		icon: catIcon,
		color: catColor,
		added_by: userId,
	});
}

function postExpense(expense, catId, userId) {
	return $.post(DB.expenses, {
		spent: expense,
		user_id: userId,
		cat_id: catId,
		date: new Date()
	});
}

function updateSpentMoney(money, user) {
	return $.ajax(DB.users + user.id, {
		method: 'PUT',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			email: user.email,
			password: user.password,
			budget: user.budget,
			spentMoney: money,
			currency: user.currency,
		}),
		dataType: 'json'
	});
}

function updateBudget(newBudget, user) {
	return $.ajax(DB.users + user.id, {
		method: 'PUT',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			email: user.email,
			password: user.password,
			budget: newBudget,
			spentMoney: user.spentMoney,
			currency: user.currency,
		}),
		dataType: 'json'
	});
}

function updateCategory(id, name, icon, color, userId) {
	return $.ajax(DB.categories + id, {
		method: 'PUT',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			name: name,
			icon: icon,
			color: color,
			added_by: userId
		}),
		dataType: 'json'
	});
}