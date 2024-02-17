class Auth {
	constructor() {
		document.querySelector("body").style.display = "none";
		const auth = localStorage.getItem("auth");
		this.validateAuth(auth);
	}

	saveUser(body) {
		localStorage.setItem("access_token", body?.access_token);
		localStorage.setItem("refresh_token", body?.refresh_token);
	}

	validateAuth(auth) {
		if (auth != 1) {
			window.location.replace("/");
		} else {
			document.querySelector("body").style.display = "block";
		}
	}

	logOut() {
		localStorage.removeItem("auth");
		window.location.replace("/");
	}
}