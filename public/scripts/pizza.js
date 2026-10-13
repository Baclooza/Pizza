document.getElementById("pizza-form").onsubmit = () => {
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let isValid = true;

    
    if (fname == ""){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    if (lname == ""){
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    if (email == ""){
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    return isValid;
    
};

function clearErrors(){
    let errors = document.getElementById("err");
    for (let i=0; i<error.length; i++){
        errors[i].style.display = "none"
    }
}

