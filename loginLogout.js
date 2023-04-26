 // ?!!WORK not super
      // Проверяем наличие токена в localStorage
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     // Если токен существует, отправляем запрос на сервер, чтобы получить информацию о пользователе
    //     fetch("http://localhost:8080/user", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         // Заменяем поля "Sign Up / Sign In" на имя и фамилию пользователя
    //         const name = `${data.firstName} ${data.lastName}`;
    //         // const name = `Logout`;
    //         const signUpButton = document.querySelector(".sign-up");
    //         signUpButton.innerHTML = name;
    //         signUpButton.classList.remove("sign-up");
    //         signUpButton.classList.add("user-name");

    //         // Добавляем кнопку "Log Out"
    //         const accountCartContainer = document.querySelector(
    //           ".account-cart-container"
    //         );
    //         // const logOutButton = document.querySelector(".user-name");
    //          const logOutButton = document.createElement('button');
    //         logOutButton.classList.add("log-out");
    //         logOutButton.innerText = "Log Out";
    //         accountCartContainer.insertBefore(
    //           logOutButton,
    //           accountCartContainer.childNodes[1]
    //         );

    //         // Добавляем обработчик события клика на кнопку "Log Out"
    //         logOutButton.addEventListener("click", () => {
    //           localStorage.removeItem("token");
    //           location.reload();
    //           window.location.href = "http://127.0.0.1:5500/login.html";
    //         });
    //       })
    //       .catch((error) => console.error(error));
    //   }

    // Проверяем наличие токена в localStorage
const token = localStorage.getItem("token");
if (token) {
  // Если токен существует, отправляем запрос на сервер, чтобы получить информацию о пользователе
  fetch("http://localhost:8080/user/getUserByToken?token=" + token, {
    headers: {
      "accept": "*/*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Заменяем поля "Sign Up / Sign In" на имя и фамилию пользователя
      const name = `${data.firstName} ${data.lastName}`;
      const signUpButton = document.querySelector(".sign-up");
      signUpButton.innerHTML = name;
      signUpButton.classList.remove("sign-up");
      signUpButton.classList.add("user-name");

      // Добавляем кнопку "Log Out"
      const accountCartContainer = document.querySelector(
        ".account-cart-container"
      );
    //   const logOutButton = document.createElement("button");
    const logOutButton = document.querySelector(".user-name");
      logOutButton.classList.add("log-out");
    //   logOutButton.innerText = "Log Out";
      accountCartContainer.insertBefore(
        logOutButton,
        accountCartContainer.childNodes[1]
      );

      // Добавляем обработчик события клика на кнопку "Log Out"
      logOutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        location.reload();
        window.location.href = "http://127.0.0.1:5500/login.html";
      });
    })
    .catch((error) => console.error(error));
}