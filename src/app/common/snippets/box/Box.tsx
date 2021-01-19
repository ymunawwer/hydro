import React from "react";
import "./box.scss";
import "./box-ar.scss";
import { useTranslation } from "react-i18next";
import AmountCurrency from "../../../config/AmountCurrency";

export interface IProps {
  label?: string;
  currency?: string;
  amount?: any;
  amount1?: any;
  amount2?: any;
  className?: any;
  onClick?: () => void;
  noCurrency?: boolean;
  loading?: boolean;
}

const Box = (props: IProps) => {
  const { t } = useTranslation();
  const {
    label,
    currency,
    amount,
    amount1,
    amount2,
    className,
    noCurrency,
    loading,
  } = props;
  const classCondition = className
    ? "transactionOverview" + " " + className
    : "transactionOverview";

  return (
    <div className={classCondition}>
      {loading ? (
        <div className="boxLoader"></div>
      ) : (
        <>
          <span className="label">{label}</span>
          {(amount || amount === 0) && (
            <AmountCurrency
              amount={amount}
              currency={currency ? currency : t("sar")}
            />
          )}
          {(amount1 || amount1 === 0) && (amount2 || amount2 === 0) && (
            <>
              <span className="amount credited">
                {amount1} <span className="amount debited">{amount2}</span>
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Box;
