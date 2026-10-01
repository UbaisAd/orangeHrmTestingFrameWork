const loginData = [
    {
        username: "admin",
        password: "admin123",
        expected: "success"
    },
    {
        username: "Admin",
        password: "wrong123",
        expected: "failure"
    },
    {
        username: "wrongUser",
        password: "admin123",
        expected: "failure"
    }
];

module.exports = loginData;