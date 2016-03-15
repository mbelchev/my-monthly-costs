$(document).ready(function() {

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        
        return pattern.test(emailAddress);
    };

    function showForm(formName) {
        if (formName == 'signUp') {
            $('.login-form').css('display', 'none');
            $('.register-form').css('display', 'block');

            $('.sign-up').css('display', 'none');
            $('.sign-in').css('display', 'inline-block');
        } else if (formName == 'signIn') {
            $('.login-form').css('display', 'block');
            $('.register-form').css('display', 'none');

            $('.sign-up').css('display', 'inline-block');
            $('.sign-in').css('display', 'none');           
        }
    }

    function showMsg(type, msg) {
        $('.alert.alert-' + type).css('display', 'block').text(msg).delay(3000).fadeOut('slow');        
    }
    
    /*
        Fullscreen background
    */
    var rand = Math.floor(Math.random() * 6) + 1;
    $.backstretch("assets/img/backgrounds/" + rand + ".jpg");
    
    /*
        Form validation
    */
    $('.register-form input[type="text"], .register-form input[type="password"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });

    $('.register-form').on('submit', function(e) {
        e.preventDefault();

        var input = {
            email: $('.register-form input[name="form-email"]'),
            password: $('.register-form input[name="form-password"]'),
            passwordRepeat: $('.register-form input[name="form-password-repeat"]'),
        }

		if( input.email.val() == '' || input.password.val() == '' || input.passwordRepeat.val() == '' ) {
			$(this).addClass('input-error');
            showMsg('danger', 'Please fill all inputs!');
        } else if (!isValidEmailAddress( input.email.val() )) {
            input.email.addClass('input-error');
            showMsg('danger', 'Please use valid email!');
        } else if (input.password.val().length < 6) {
            input.password.addClass('input-error');
            input.passwordRepeat.addClass('input-error');
            showMsg('danger', 'Please use password longer than six symbols!');
        } else if (input.password.val() != input.passwordRepeat.val() ) {
            input.password.addClass('input-error');
            input.passwordRepeat.addClass('input-error');
            showMsg('danger', 'Please repeat the password correctly!');
        } else {
            checkEmail(input.email.val()).success(function(msg) {
                if (msg.length == 0) {
                    $(this).removeClass('input-error');
                    setUser();
                    showForm('signIn');
                    showMsg('success', 'Registered successfully! You may sign in now.');
                } else {
                    input.email.addClass('input-error');
                    showMsg('danger', 'This email is already taken!');                   
                }
            });
        }    
    });

    $('.login-form').on('submit', function(e) {
        e.preventDefault();

        var input = {
            email: $('.login-form input[name="form-email"]'),
            password: $('.login-form input[name="form-password"]')
        }

        if( input.email.val() == '' || input.password.val() == '' ) {
            $(this).addClass('input-error');
            showMsg('danger', 'Please fill all inputs!');
        } else {
            checkUser(input.email.val(), input.password.val()).success(function(msg) {
                console.log(msg);
                if (msg.length == 0) {
                    input.email.addClass('input-error');
                    input.password.addClass('input-error');
                    showMsg('danger', 'Wrong email or password!');    
                } else {
                    $(this).removeClass('input-error');
                    showMsg('success', 'Logged in successfully!');
                }
            });
        }
    });

    $('.sign-up').on('click', function() {
        showForm('signUp');
    });

    $('.sign-in').on('click', function() {
        showForm('signIn');
    });
    
});