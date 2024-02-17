class Auth {
    constructor() {}

    saveUser(tokens, username) {
        localStorage.setItem("access_token", tokens?.access_token);
        localStorage.setItem("refresh_token", tokens?.refresh_token);
        localStorage.setItem("username", username);
    }

    logOut() {
        localStorage.removeItem("auth");
        window.location.replace("/");
    }
}

const auth = new Auth();

const btn = document.querySelectorAll(".btns");
const tab = document.querySelectorAll(".form");
const login_form = document.getElementById("auto");
const register_form = document.getElementById("regis");


btn.forEach(function (item) {
    item.addEventListener("click", function () {
        let currentBtn = item;
        let dataid = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(dataid);

        tab.forEach(function (item) {
            item.classList.remove('show');
            item.classList.remove('enable');
        });

        currentTab.classList.add('show');

    });
});

login_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let data = new FormData(login_form);
    let userCredentials = {
        username: data.get("email"),
        password: data.get("password")
    }
    console.log(JSON.stringify(userCredentials))

    fetch(login_addr, {
        method: 'POST',
        headers: auth_headers,
        body: JSON.stringify(userCredentials)
    }).then(async (res) => {
        let body = {}
        switch (res.status) {
            case 200:
                body = await res.json()
                auth.saveUser(body, userCredentials.username)
                console.log("user saved!")
                window.location.replace("dashboard.html");
                break
            case 400:
            case 500:
                body = await res.json()
                console.log(body)
                break
            default:
                console.error("unknown status =", res.status)
        }
    })
});

register_form.addEventListener("submit", (e) => {
    let data = new FormData(register_form);
    let userCredentials = {
        name: data.get("name") + " " + data.get("surname"),
        username: data.get("email"),
        email: data.get("email"),
        password: data.get("password")
    }
    if (document.getElementById("flexSwitchStudent").checked) {
        userCredentials.user_type = "student"
    } else if (document.getElementById("flexSwitchConsultant").checked) {
        userCredentials.user_type = "hr"
    }

    console.log(JSON.stringify(userCredentials))

    fetch(register_addr, {
        method: 'POST',
        headers: auth_headers,
        body: JSON.stringify(userCredentials)
    }).then(async (res) => {
        switch (res.status) {
            case 204:
                alert("You registered successfully!")
                window.location.replace("newlogin.html")
                return
            case 400:
            case 409:
            case 500:
                let body = await res.json()
                console.log(body)
                break
            default:
                console.error("unknown status =", res.status)
        }

        e.preventDefault();
    })
})