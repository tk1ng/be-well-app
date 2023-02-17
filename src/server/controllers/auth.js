module.exports = {
    register: (req, res) => {
        console.log(req.body, 'creating user...');
    },
    login: (req, res) => {
        console.log(req.body, 'logging in...');
    }
}