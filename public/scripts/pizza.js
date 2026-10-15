document.getElementById("pizza-form").onsubmit = () => {
    // Reset validation
    let isValid = true;
    
    // Clear errors
    clearErrors();

    // Validate First Name
    let fname = document.getElementById("fname").value.trim();
    if (fname == ""){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate Last Name
    let lname = document.getElementById("lname").value.trim();
    if (lname == ""){
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // Validate Email
    let email = document.getElementById("email").value.trim();
    if (email == ""){
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // Validate Pickup or Delivery
    let methodSelected = false;
    let methodButtons = document.getElementsByName("method");
    for (let i=0; i<methodButtons.length; i++){
        if(methodButtons[i].checked){
            methodSelected = true;
        }
    }

    if (!methodSelected){
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    // Validate size
    let size = document.getElementById('size').value;
    if (size === "none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    // Do not submit if form data is invalid
    return isValid;
};

function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++){
        errors[i].style.display = "none"
    }
    isValid = true;
}

