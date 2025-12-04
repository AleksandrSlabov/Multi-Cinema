export function initAuth() {
  const buttonRegistarationUser = document.querySelectorAll(
    ".btn__registr__user"
  );

  if (buttonRegistarationUser.length === 0) {
    return;
  }

  buttonRegistarationUser.forEach((el) =>
    el.addEventListener("click", function () {
      const showModal = `<div class="loginToProfileOrRegistr">
    <button class="btn__close">&#10005;</button>

    <div class="conteiner__button__show__modal"> 
    <button class="loginToProfile button__modal">Войти в профиль</button>
    
    <button type="submit" class="formRegistr button__modal">Зарегестрироваться </button>
    </div>

<form type="submit" class="conteinerLoginPtofile ">
<h3>Войти в профиль </h3>
  <input class="showModalInput" type="email" name="email" placeholder="email" required>
  <input class="showModalInput" type="password"name="Password" placeholder="password" required>
  <button class="button__modal buttonLoginToProfile">Войти</button>
</form>


<form class="showModalForm" action="">
<h3>Регестрация </h3>
  <input class="showModalInput" type="text" name="Name" placeholder="Name" required>
  <input class="showModalInput" type="text" name="Surname" placeholder="Surname" >
  <input class="showModalInput" type="email" name="email" placeholder="email" required>
  <input class="showModalInput" type="password" name="password" placeholder="password" required>
   <textarea class="showModalInput" placeholder="Расскажите о себе " name="" id=""></textarea> 

  <button class="button__modal button__registration" type="submit">Зарегестрироваться </button>

</form>
</div>`;
      document
        .querySelector(".body")
        .insertAdjacentHTML("afterbegin", showModal);
      setTimeout(() => {
        document
          .querySelector(".loginToProfileOrRegistr")
          .classList.add("active");
      }, 10);
    })
  );
  const users = JSON.parse(localStorage.getItem("users")) || [];
  //управелние модальным окном регестрации пользователя
  document.addEventListener("click", function (e) {
    // console.log(e.target);
    //функция открытия и закрытия модального окна
    const closeAndOpenShowModal = (selector, method) =>
      document.querySelector(selector).classList[method]("active");
    //очистка импута
    const clearInput = () =>
      document
        .querySelectorAll(".showModalInput")
        .forEach((el) => (el.value = ""));
    //функция для сбора формы
    function formSubmit(formSelector) {
      const form = document.querySelector(formSelector);
      if (!form) return null;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      return data;
    }
    // }

    if (e.target.closest(".loginToProfile")) {
      console.log("Local storage", localStorage.getItem("users"));
      closeAndOpenShowModal(".conteiner__button__show__modal", "add");
      closeAndOpenShowModal(".conteinerLoginPtofile", "add");
    }
    //Отправка формы входа на сайт  без валидации пароля
    if (e.target.closest(".buttonLoginToProfile")) {
      e.preventDefault();

      const formData = formSubmit(".conteinerLoginPtofile");
      if (formData) {
        console.log(formData);
        const localData = JSON.parse(localStorage.getItem("users"));
        console.log(localData);

        const user = localData.find(
          (user) =>
            user.email === formData.email && user.password === formData.Password
        );

        console.log("Найденный пользователь:", user);
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.href = "indexAccount.html";
        }
        console.log("current account goood", localStorage);
        //localData.forEach((el) => {
        // if (
        //   el.email === formData.email &&
        //   el.password === formData.Password
        // ) {
        //   closeAndOpenShowModal(".loginToProfileOrRegistr", "remove");
        //   console.log("данные подошли ", el.email, el.password, el);

        //   clearInput();
        //   // localStorage.setItem(
        //   //   "currentUser",
        //   //   JSON.stringify(el.Name, el.Surname)
        //   // );
        //   // window.location.href = "indexAccount.html";
        // }
        // else {
        //     console.log(
        //       "error",
        //       el.email,
        //       el.password,
        //       formData.email,
        //       formData.Password
        //     );
        //   }
        // });
      }
    }

    if (e.target.closest(".formRegistr")) {
      closeAndOpenShowModal(".conteiner__button__show__modal", "add");
      closeAndOpenShowModal(".showModalForm", "add");
    }
    //отправка формы регестрации
    if (e.target.closest(".button__registration")) {
      e.preventDefault();
      const formData = formSubmit(".showModalForm");
      if (formData) {
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Local storage", localStorage.getItem("users"));
        clearInput();
        closeAndOpenShowModal(".showModalForm", "remove");
        closeAndOpenShowModal(".conteiner__button__show__modal", "remove");
      }
    }

    if (e.target.closest(".btn__close")) {
      closeAndOpenShowModal(".showModalForm", "remove");
      closeAndOpenShowModal(".conteiner__button__show__modal", "remove");
      closeAndOpenShowModal(".loginToProfileOrRegistr", "remove");
      closeAndOpenShowModal(".conteinerLoginPtofile", "remove");

      clearInput();
    }
  });
}
