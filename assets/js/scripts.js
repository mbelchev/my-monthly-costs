
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    var rand = Math.floor(Math.random() * 6) + 1;
    $.backstretch("assets/img/backgrounds/" + rand + ".jpg");
    
    /*
        Form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });

    $('.sign-up').on('click', function() {
        $('.login-form').css('display', 'none');
        $('.register-form').css('display', 'block');

        $('.sign-up').css('display', 'none');
        $('.sign-in').css('display', 'inline-block');
    });

    $('.sign-in').on('click', function() {
        $('.login-form').css('display', 'block');
        $('.register-form').css('display', 'none');

        $('.sign-up').css('display', 'inline-block');
        $('.sign-in').css('display', 'none');
    });
    
    
});
