$('.message a').click(function(){
   		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   		$('input').val('');
});



$("#registerForm").submit(function(e){
	 $('.invalid-credentials.error-message').hide();
	e.preventDefault();
	var validForm = true;
	var registerFormInput = $('#registerForm').serialize();
	var registerFormData = (JSON.stringify(jQuery('#registerForm').serializeArray()));

	var username = registerForm[0];
	var password = registerForm[1];

	if (!username.value) {
		validForm = false;
		$('.register.invalid-username.error-message').show();
	} else {
		$('.register.invalid-username.error-message').hide();
	}
	if (!password.value) {
		validForm = false;
		$('.register.invalid-password.error-message').show();
	} else {
		$('.register.invalid-password.error-message').hide();
	}

	if (validForm) {
		var queryParams = "register/?" + registerFormInput;

		$.ajax({
			url : queryParams,
			type: 'GET',
			success: function(data) {
				$('.register.invalid-username.error-message').hide();
				$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   				$('input').val('');
			},
			error: function(data) {
				$('.register.invalid-username.error-message').show();
			}
		})
	}
})

$("#loginForm").submit(function(e){
	 $('.invalid-credentials.error-message').hide();
	e.preventDefault();
	// stop the form from submitting
	e.preventDefault();
	var loginFormInput = $('#loginForm').serialize();
	var loginFormData = JSON.parse(JSON.stringify(jQuery('#loginForm').serializeArray()));
	var validForm = true;

	var username = loginForm[0];
	var password = loginForm[1];

	if (!username.value) {
		validForm = false;
		$('.login.invalid-username.error-message').show();
	} else {
		$('.login.invalid-username.error-message').hide();
	}
	if (!password.value) {
		$('.login.invalid-password.error-message').show();
	} else {
		$('.login.invalid-password.error-message').hide();
	}

	if (validForm) {
		var queryParams = "login/?" + loginFormInput;

		$.ajax({
			url : queryParams,
			type: 'GET',
			success: function(data) {
				window.location.href = "todolist"
			},
			error: function(data) {
				 $('.invalid-credentials.error-message').show();
			}
		})
	}
})
