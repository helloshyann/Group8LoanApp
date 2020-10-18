function goLogin() {

    let email = document.getElementById("exampleInputEmail").value;
    let password = document.getElementById("exampleInputPassword").value;

    let accountEmail = "demo@email.com";
    let accountPassword = "password";

    if (email == "" || password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter an email and password.',
        })
    }
    else if (email != accountEmail || password != accountPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your email and password combination is incorrect.',
        })
    }
    else {
       
        document.location.href = "index.html";
    }

}




