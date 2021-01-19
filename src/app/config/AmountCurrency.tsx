import React from "react";
import { useTranslation } from "react-i18next";

interface AProps {
  amount: number | string;
  currency: string;
  showDebit?: boolean;
  DCMark?: string;
}

export const AmountCurrent = (props: AProps) => {
  const { i18n } = useTranslation();
  const { amount, currency } = props;
  return (
    <span className="amountCurrency">
      {i18n.language === "en" && <span className="currencyNo">{currency}</span>}
      <span
        className={`amountNo ${
          props.showDebit && props.DCMark === "C" ? "credit" : ""
        }`}
      >
        {props.showDebit ? (
          <span>{props.DCMark === "C" ? "+" : "-"}</span>
        ) : null}
        {amount}
      </span>
      {i18n.language === "ar" && <span className="currencyNo">{currency}</span>}
    </span>
  );
};

export default AmountCurrent;
