import React from "react";
import i18n from "../i18n";

export let months = [];

export const getDateFormat = (date: Date) => {
  const newDate = new Date(date);
  const monthIndex = newDate.getMonth();
  const month = months[monthIndex] && months[monthIndex].substring(0, 3);
  return newDate && month
    ? (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()) +
        " " +
        month +
        " " +
        newDate.getFullYear()
    : "";
};

i18n.on("languageChanged", (lng) => {
  months = [
    i18n.t("january"),
    i18n.t("february"),
    i18n.t("march"),
    i18n.t("april"),
    i18n.t("may"),
    i18n.t("june"),
    i18n.t("july"),
    i18n.t("august"),
    i18n.t("september"),
    i18n.t("october"),
    i18n.t("november"),
    i18n.t("december"),
  ];
});

export const calenderLocale = () => {
  const months = [
    i18n.t("january"),
    i18n.t("february"),
    i18n.t("march"),
    i18n.t("april"),
    i18n.t("may"),
    i18n.t("june"),
    i18n.t("july"),
    i18n.t("august"),
    i18n.t("september"),
    i18n.t("october"),
    i18n.t("november"),
    i18n.t("december"),
  ];
  const days = [
    i18n.t("monday"),
    i18n.t("tuesday"),
    i18n.t("wednesday"),
    i18n.t("thursday"),
    i18n.t("friday"),
    i18n.t("saturday"),
    i18n.t("sunday"),
  ];
  return {
    localize: {
      month: (n: any) => months[n],
      day: (n: any) => days[n],
    },
    formatLong: {},
  };
};

export const getDeviceInfo = () => {
  const module = {
    options: [],
    header: [
      navigator.platform,
      navigator.userAgent,
      navigator.appVersion,
      navigator.vendor,
      window.opera,
    ],
    dataos: [
      {
        name: "Windows Phone",
        device: "Phone",
        value: "Windows Phone",
        version: "OS",
      },
      { name: "Windows", device: "Desktop", value: "Win", version: "NT" },
      { name: "iPhone", device: "IPhone", value: "iPhone", version: "OS" },
      { name: "iPad", device: "IPad", value: "iPad", version: "OS" },
      {
        name: "Android",
        device: "Phone",
        value: "Android",
        version: "Android",
      },
      { name: "Macintosh", device: "Desktop", value: "Mac", version: "OS X" },
      { name: "Linux", device: "Desktop", value: "Linux", version: "rv" },
    ],
    databrowser: [
      { name: "Chrome", value: "Chrome", version: "Chrome" },
      { name: "Firefox", value: "Firefox", version: "Firefox" },
      { name: "Safari", value: "Safari", version: "Version" },
      { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
      { name: "Opera", value: "Opera", version: "Opera" },
      { name: "BlackBerry", value: "CLDC", version: "CLDC" },
      { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
    ],
    init: function() {
      var agent = this.header.join(" "),
        os = this.matchItem(agent, this.dataos),
        browser = this.matchItem(agent, this.databrowser);

      return { os: os, browser: browser };
    },
    matchItem: function(string: string, data: any) {
      var i = 0,
        j = 0,
        html = "",
        regex,
        regexv,
        match,
        matches,
        version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, "i");
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
          matches = string.match(regexv);
          version = "";
          if (matches) {
            if (matches[1]) {
              matches = matches[1];
            }
          }
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + ".";
              } else {
                version += matches[j];
              }
            }
          } else {
            version = "0";
          }
          return {
            name: data[i].name,
            version: parseFloat(version),
          };
        }
      }
      return { name: "unknown", version: 0 };
    },
  };
  const info = module.init();
  return {
    device: info.os.name,
    browser: info.browser.name,
    deviceVersion: info.os.version,
    browserVersion: info.browser.version.toFixed(),
  };
};

export const countryCodes: any = [
  {
    value: "+966",
    label: (
      <div>
        <img src="/assets/images/countryFlags/saudi.png" alt="saudi" /> +966
      </div>
    ),
  },
  {
    value: "+971",
    label: (
      <div>
        <img src="/assets/images/countryFlags/uae.png" alt="uae" /> +971
      </div>
    ),
  },
];

export const monthDay = (date: string) => {
  if (!date) return null;
  let DATE = date.split(" ");
  if (i18n.language === "en") {
    return DATE[1] + " " + i18n.t(DATE[0].toLowerCase()).substr(0, 3);
  } else {
    return DATE[1] + "  " + i18n.t(DATE[0].toLowerCase());
  }
};
