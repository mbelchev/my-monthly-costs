$(document).ready(function() {
	$('#addExpense').on('click', function() {
		if ( !(expense = $('#expenseValue').val()) || !(category = $('#expenseCategory').val())) 
			showMsg('danger', 'Fill all fields!');
		else if ( expense.indexOf("-") >= 0 )
			showMsg('danger', 'Wrong value!');
		else postExpense(expense, category, user.id).success(function() {
			updateSpentMoney(parseInt(user.spentMoney) + parseInt(expense), user);
		}).then(function() {
			setTimeout(window.location.reload(), 800);
		});
	});
	
	$('#changeBudget').on('click', function() {
		if ( !(budget = $('#budgetValue').val()) ) 
			showMsg('danger', 'Please fill a budget.');
		else updateBudget(budget ,user).success(function() {
			setTimeout(window.location.reload(), 800);
		});
	});
	
	$('#addNewCategory').on('click', function() {
		if ( !(name = $('#categoryName').val()) || !(color = $('#categoryColor').val()) || !(icon = $('#categoryIcon').val())) 
			showMsg('danger', 'Fill all fields!');
		else getCatByName(name).success(function(data) {
			if (data.length > 0) showMsg('danger', 'This category already exists!');
			else postCategory(name, color, icon, user.id).success(function() {
				showMsg('success', 'Category added successfully!');
				setCategories();
			});
		});
	});
	
	$(document).on("click", ".category-item[data-cat-id]", function() {
		getCatById(id = $(this).attr('data-cat-id')).success(function(category) {
			$('#editCategory input#categoryId').val(id);
			$('#editCategory input#categoryName').val(category[0].name);
			$('#editCategory input#categoryColor').val(category[0].color);
			$('#editCategory input#categoryIcon').val(category[0].icon);
			
			$('#editCategory').modal({show: 'true'});
		});
	});
	
	$('#editTheCategory').on('click', function() {
		if ( !(name = $('#editCategory input#categoryName').val()) || !(color = $('#editCategory input#categoryColor').val()) || !(icon = $('#editCategory input#categoryIcon').val())) 
			showMsg('danger', 'Fill all fields!');
		else updateCategory($('#editCategory input#categoryId').val(), name, icon, color, user.id).success(function() {
			showMsg('success', 'Category edited successfully!');
			setCategories();
		});
	});
	
});

function showMsg(type, msg) {
    $('.alert.alert-' + type).css('display', 'block').text(msg).delay(3000).fadeOut('slow');        
}