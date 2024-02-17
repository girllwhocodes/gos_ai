const username_form = document.getElementById("user_name");
const usertype_form = document.getElementById("user_type");


let user = {}
let tokens = {
    username: localStorage.getItem("username"),
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token")
}

console.log(JSON.stringify(tokens))

fetch(get_user_addr + "/" + tokens.username + "?" + new URLSearchParams({
    "access_token": tokens.access_token
}), {
    method: 'GET',
    headers: auth_headers
}).then(async (res) => {
    switch (res.status) {
        case 200:
            user = await res.json()
            console.log("Success:", user)
            username_form.innerHTML = user.name;
            if (user.user_type !== undefined) {
                usertype_form.innerHTML = user.user_type;
            }
            break
        case 404:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("username");
            window.location.replace("newlogin.html");
            break
        case 400:
        case 403:
        case 500:
            let body = await res.json()
            console.log("status=", res.status, ", body=", body)
            break
        default:
            console.error("unknown status =", res.status)
    }
})
