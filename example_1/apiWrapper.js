import axios from "axios";

const host = "http://localhost:8000/";
const apiWrapper = (method = "get", url = "", body = {}) => {
  console.log("LINK", `${host}${url}`);
  if (method === "get") {
    return axios.get(`${host}${url}`);
  } else if (method === "post") {
    return axios.post(`${host}${url}`, body);
  } else return "Incorrect HTTP-method";
};
export default class ApiWrapper {
  //pages connection

  static postLoginPage = body => {
    return apiWrapper("post", `design/check_promocode/`, body);
  };

  static postOrderPage = body => {
    return apiWrapper("post", `design/order_confirm/`, body);
  };

  static postSendSessionPage = body => {
    return apiWrapper("post", `design/session/`, body);
  };

  static getMainPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/main_page/${locale}/`);
  };

  static getFaqPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/faq/${locale}/`);
  };

  static getRequestPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/request_page/${locale}/`);
  };

  static getDesignerPortfolioPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/designer_portfolio/${locale}/`);
  };

  static getPhotoAlbumExamplesPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/photo_album_examples/${locale}/`);
  };

  static getLoginPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/login_page/${locale}/`);
  };

  static getChooseAlbumPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/choose_album_page/${locale}/`);
  };

  static getThankYouPageI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/thank_you/${locale}/`);
  };

  //components connection

  static getSidebarI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/sidebar/${locale}/`);
  };

  static getHeaderFooterI18N = (locale = "hello") => {
    return apiWrapper("get", `design/i18n/header_footer/${locale}/`);
  };
}
