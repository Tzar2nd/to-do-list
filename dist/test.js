loginUser = ((email, password) => {
    console.log("Logging in");

    return new Promise((resolve, reject) => {

            setTimeout(() => {
                if (password === '') {
                    reject("no password");
                } else {
                    console.log("We have data");
                    resolve({ userEmail: email });
                }
            }, 1000);
    });
});

const user = loginUser("Ben", "")
            .then(user => console.log(user));