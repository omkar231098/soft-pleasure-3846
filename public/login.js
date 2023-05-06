let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);



// signup form code======>

let registerUserUsername = document.getElementById("register-user-name");
let registerUserEmail = document.getElementById("register-user-email");
let registerUserPassword = document.getElementById("register-user-passowrd");
let registerUserButton = document.getElementById("register-user");

let LoginUserEmail = document.getElementById("login-user-email");
let LoginUserPassword = document.getElementById("login-user-passowrd");
let LoginUserButton = document.getElementById("login-user");

registerUserButton.addEventListener("click", function (e) {

 
      alert("Register User Successfully");
  
      e.preventDefault();
  
      let UserName = registerUserUsername.value;
      let email = registerUserEmail.value;
     let Password = registerUserPassword.value;
  
      registerUser(UserName,  email, Password);
    
  });


  function registerUser(UserName,  email, Password) {
    // http://localhost:3000/user/register
    //
  fetch("https://real-pink-bass-hose.cyclic.app/user/register", {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: UserName,
      email: email,
      password: Password,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}


// Login form code======>




LoginUserButton.addEventListener("click", function (e) {
  
      alert("Login User Successfully");
  
      e.preventDefault();
  
      let UserName = LoginUserEmail.value;
     
      let Password = LoginUserPassword.value;
  
      registerUser1(UserName, Password);
   
  });
  
  function registerUser1(UserName, Password) {
    // 
    // http://localhost:3000/user/login
    // 
    fetch("https://real-pink-bass-hose.cyclic.app/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       email: UserName,
        password: Password
      }),
    })
      .then((response) => response.json())
      .then((data) =>{console.log(data)
     localStorage.setItem("token",data.token)
     window.open("index.html");
     
      } )
      .catch((error) => console.error(error));
  }
  
