document.addEventListener("DOMContentLoaded", function () {
  // Variables para elementos HTML
  var text_welcome = document.getElementById("user_greeting");
  var text_sign = document.getElementById("sign_text");
  var text_log = document.getElementById("log_text");
  
  // Obtener datos del almacenamiento local
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var passwords = JSON.parse(localStorage.getItem("passwords")) || []; 

 
  
  // Comprobar si el usuario actual está registrado
  var currentUser = localStorage.getItem("currentUser");

  // Función para mostrar un mensaje en un elemento HTML
  function showMessage(element, message) {
    if (element) {
      element.innerHTML = message;
    }
  }

  // Evento de registro de usuario
  var signupBtn = document.getElementById("signup_btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", function () {
      var user = document.getElementById("user_sign").value.trim();
      var pass = document.getElementById("password_sign").value.trim();
  
      if (user !== "" && pass !== "") {
        if (users.includes(user)) {
          showMessage(text_sign, "El usuario ya existe");
        } else {
          users.push(user);
          passwords.push(pass);
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("passwords", JSON.stringify(passwords));
          localStorage.setItem("currentUser", user);
          showMessage(text_sign, "Te has registrado");
        }
      } else {
        showMessage(text_sign, "Inserte datos por favor");
      }
    });
  }

  // Evento de inicio de sesión
  var loginBtn = document.getElementById("login_btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      var user_log = document.getElementById("user_log").value.trim();
      var pass_log = document.getElementById("password_log").value.trim();
  
      var userIndex = users.indexOf(user_log);
  
      if (userIndex !== -1) {
        if (passwords[userIndex] === pass_log) {
          localStorage.setItem("currentUser", user_log);
          showMessage(text_log, "Inicio de Sesión Exitoso");
        } else {
          showMessage(text_log, "Contraseña incorrecta");
        }
      } else {
        showMessage(text_log, "No existe esa cuenta");
      }
    });
  }

  // Evento de cierre de sesión
  var logoutBtn = document.getElementById("cerrar_sesion");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      showMessage(text_welcome, "");
    });
  }

  // Evento de eliminar sesión
  var outBtn = document.getElementById("borrar_sesion");
  if (outBtn) {
    outBtn.addEventListener("click", function () {
      var currentPass = localStorage.getItem("currentPass");
      if (currentUser) {
        var index = users.indexOf(currentUser);
        if (index !== -1) {
          users.splice(index, 1);
          passwords.splice(index, 1);
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("passwords", JSON.stringify(passwords));
        }
        localStorage.removeItem("currentUser");
        showMessage(text_welcome, "");
      }
      if (currentPass) {
        localStorage.removeItem("currentPass");
      }
    });
  }

  // Mostrar mensaje de bienvenida si el usuario está registrado
  if (currentUser && text_welcome) {
    text_welcome.innerHTML = "Bienvenido/a, " + currentUser + "!";
  }
});
