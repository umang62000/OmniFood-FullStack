const stripe = Stripe('pk_test_SsKoYCV72kDD5qfxtpEpmuGJ00hxa9zmKd');
const login=document.querySelector(".login");
const signup=document.querySelector(".signup-form");
const updatePassword=document.querySelector(".updatePassword");
const forgetPassword=document.querySelector(".forget");
const resetPassword=document.querySelector(".reset");
const signupButtons=document.querySelectorAll(".signup-button");

async function mylogin(email,password) {
    const result=await axios.post("/api/user/login",{
        email,
        password
    });
    if (result.data.success) {
        alert("User logged in");
        location.assign("/me");
    }else{
        alert("wrong email or password");
    }
}

async function mysignup(name,email,password,confirmpassword){
    const result=await axios.post("/api/user/signup",{
        name,
        email,
        password,
        confirmpassword
    });
    if (result.data.success) {
        alert("User signedup");
    }else{
        alert("Please enter all details");
    }
}

async function myupdatePassword(password,newpassword,confirmpassword) {
    const result=await axios.patch("/api/user/updatepassword",{
        password,
        newpassword,
        confirmpassword
    });
    if(result.data.success){
        location.assign("/me");
    }
}
async function myforget(email) {
    const result=await axios.patch("/api/user/forgetPassword",{
        email
    });
    if (result.data.success) {
        alert("Usermail has been sent");
        location.assign("/reset");
    }else{
        alert("something went wrong");
    }
}
async function myresetpassword(token,password,confirmpassword) {
    const result=await axios.patch("/api/user/resetpassword",{
        token,
        password,
        confirmpassword
    });
    if (result.data.success) {
        alert("password updated successfully");
        location.assign("/login");
    }else{
        alert("something went wrong");
    }
}
async function bookings(id) {
    const result =await axios.post("/api/booking/checkout",{id});
    if (result.data.success) {
        //payment
        // console.log(result.data.session);
        await stripe.redirectToCheckout({
            sessionId:result.data.session.id
        });
        alert("payment has been done");
    }else{
        //payment fail
        // console.log('failed');
    }
}

if(login){
login.addEventListener("submit",function(event){
    event.preventDefault();
    const inputs=document.getElementsByTagName("input");
    const email=inputs[0].value;
    const password=inputs[1].value;
    // console.log("i was called");
    mylogin(email,password);
});
}
if(signup){
signup.addEventListener("submit",function(event){
    event.preventDefault();
    const inputs=document.getElementsByTagName("input");
    console.log(inputs);
    const name=inputs[0].value;
    const email=inputs[1].value;
    const password=inputs[2].value;
    const confirmpassword=inputs[3].value;
    // console.log("i was called");
    mysignup(name,email,password,confirmpassword);
});
}

if (updatePassword) {

    updatePassword.addEventListener("submit",function(event){
        event.preventDefault();
        const inputs=document.getElementsByTagName("input");
        const oldpassword=inputs[0].value;
        const newpassword=inputs[1].value;
        const confirmNewpassword=inputs[2].value;
        console.log("update password");
        myupdatePassword(oldpassword,newpassword,confirmNewpassword);
    });
    }
if (forgetPassword) {
    forgetPassword.addEventListener("submit",function (event) {
        event.preventDefault();
        const email=document.getElementsByTagName("input")[0].value;
        myforget(email);
    })
}

if (resetPassword) {
    resetPassword.addEventListener("submit",function (event) {
        event.preventDefault();
        const inputs=document.getElementsByTagName("input");
        const token=inputs[0].value;
        const NewPassword=inputs[1].value;
        const ConfirmPassword=inputs[2].value;
        myresetpassword(token,NewPassword,ConfirmPassword);

    })
}

if(signupButtons){
    console.log(signupButtons);
    for (var i = 0; i < signupButtons.length; i++) {

        signupButtons[i].addEventListener("click",function(event){
                bookings(event.target.getAttribute("plan-id"));
        });
        
    }
}
