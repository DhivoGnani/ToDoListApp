$('.message a').click(function(){
   		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$("#loginForm").submit(function(e){
	// stop the form from submitting
	e.preventDefault();
	var loginFormInput = $('#loginForm').serialize();
	var loginFormData = JSON.parse(JSON.stringify(jQuery('#loginForm').serializeArray()));
	var validForm = true;

	var username = loginForm[0];
	var password = loginForm[1];

	if (!username.value) {
		validForm = false;
		$('.invalid-username.error-message').show();
	} else {
		$('.invalid-username.error-message').hide();
	}
	if (!password.value) {
		$('.invalid-password.error-message').show();
	} else {
		$('.invalid-password.error-message').hide();
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

			}
		})
	}
})