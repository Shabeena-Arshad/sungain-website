import en from "./en_US";
import hk from "./zh_HK";
import cn from "./zh_CN";

/**
 * Available locales
 */
const locales = [
  {
    title: "English",
    locale: "en",
    display: "Eng",
    abbr: "ENG"
  },
  {
    title: "繁體",
    locale: "hk",
    display: "繁",
    abbr: "HKG"
  },
  {
    title: "简体中文",
    locale: "cn",
    display: "简",
    abbr: "CN"
  }
];

export { en, hk, cn, locales };
