const base_addr = "http://localhost:8000";
const auth_addr = "http://localhost:8001";

const login_addr = auth_addr + "/login";
const register_addr = auth_addr + "/register";
const refresh_token_addr = auth_addr + "/token/refresh";
const get_user_addr = auth_addr + "/user"; // username must be added: /user/{username}


let auth_headers = new Headers();
auth_headers.append('Content-Type', 'application/json');
auth_headers.append('Accept', 'application/json');
auth_headers.append('Host', auth_addr);
auth_headers.append("Accept-Encoding", "gzip, deflate, br");
auth_headers.append("Connection", "keep-alive");
