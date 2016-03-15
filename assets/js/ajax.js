var ENDPOINT = 'http://localhost:3000/';
var DB = {
	'users': ENDPOINT + 'users',
	'categories': ENDPOINT + 'categories',
	'expenses': ENDPOINT + 'expenses',
};


function setUser() {
	$.ajax(DB.users, {
		method: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify({
			email: $('.register-form input[name="form-email"]').val(),
			password: $('.register-form input[name="form-password"]').val(),
		}),
		dataType: 'json'
	});
}

function checkEmail(email) {
    return $.ajax(DB.users + '?email=' + email, {
        method: 'GET',
        dataType: 'json'
    });
}

function checkUser(email, password) {
	return $.ajax(DB.users + '?email=' + email + '&password=' + password, {
		method: 'GET',
		dataType: 'json'
	});
}