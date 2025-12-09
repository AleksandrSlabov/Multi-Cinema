const selectors = {
  selectorAccount: {
    //селектры для ааккаунта
    descriptionUser: ".descriptionUser",
    firstNameUser: ".nameUser",
    changeDescription: ".button__change__descriptionUser",
    conteinerDescp: ".conteiner__desctiption__user",
    buttonNextAcc: ".buttonNext",
    buttonPrevAcc: ".buttonPrev",
    accountSocialLink: ".account",
    conteinerUser: ".conteiner_user",
    conteinerModal: ".conteiner__buttonModalDescp",
    buttonOkTextArea: ".button_ok_descp",
    descpAndBtn: ".descriptionAndButton",
    textArea: ".textAreaDescp",
  },
  selectorSlide: {
    //selectorдля слайдера
    buttonArrowLeft: ".arrow__left",
    buttonArrowRigth: ".arrow__rigth",
    slideImageAll: ".img__slider",
  },

  selectorHamburger: {
    //селектры для хамбургера

    humburgerOpen: ".hamburger",
    humburgerClose: ".humburger__close",
    modalHumburger: ".modal__hamburger",
  },
  selectorAuth: {
    buttonRegistarationUserAll: ".btn__registr__user",
    templateModal: ".template__modal__auth",
  },
};

//функция для быстрого обращения к квери селектор
const funcSelect = (selector) => document.querySelector(selector);
const funcSelectAll = (selector) => document.querySelectorAll(selector);

export const element = {
  firstNameUser: funcSelect(selectors.selectorAccount.firstNameUser),
  descriptionUser: funcSelect(selectors.selectorAccount.descriptionUser),
  accountSocialLinkAll: funcSelectAll(
    selectors.selectorAccount.accountSocialLink
  ),
  buttonNextAcc: funcSelect(selectors.selectorAccount.buttonNextAcc),
  buttonPrevAcc: funcSelect(selectors.selectorAccount.buttonPrevAcc),
  changeDescription: funcSelect(selectors.selectorAccount.changeDescription),
  conteinerModal: funcSelect(selectors.selectorAccount.conteinerModal),
  conteinerUser: funcSelect(selectors.selectorAccount.conteinerUser),
  conteinerDescp: funcSelect(selectors.selectorAccount.conteinerDescp),
  buttonOkTexrArea: funcSelect(selectors.selectorAccount.buttonOkTextArea),
  descriptionAndButton: funcSelect(selectors.selectorAccount.descpAndBtn),
  textArea: funcSelect(selectors.selectorAccount.textArea),
};

export const elementSlider = {
  buttonArrowLeft: funcSelect(selectors.selectorSlide.buttonArrowLeft),
  buttonArrowRigth: funcSelect(selectors.selectorSlide.buttonArrowRigth),
  sliderImageAll: funcSelectAll(selectors.selectorSlide.slideImageAll),
};

export const elementHamburger = {
  humburgerOpen: funcSelect(selectors.selectorHamburger.humburgerOpen),
  humburgerClose: funcSelect(selectors.selectorHamburger.humburgerClose),
  modalHumburger: funcSelect(selectors.selectorHamburger.modalHumburger),
};

export const elementAunth = {
  buttonRegistarationUserAll: funcSelectAll(
    selectors.selectorAuth.buttonRegistarationUserAll
  ),
  templateModal: funcSelect(selectors.selectorAuth.templateModal),
};
