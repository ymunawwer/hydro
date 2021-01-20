import React from "react";

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

