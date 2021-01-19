import React, { useEffect } from "react";
import { approveFlow, IProps } from "../Beneficiaries.actionTypes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../../utils/Yup.validation";
import { useTranslation } from "react-i18next";
const SubmitMore = (props: IProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Formik
      initialValues={{ info: "" }}
      validationSchema={yupSchema.BeneficiaryInfoForm}
      onSubmit={(values, { setSubmitting }) => {
        let val = props.approvalRequest;
        let rowValue = [];
        rowValue.push(val && val.original && val.original._id);
        let approvereq: approveFlow = {
          //userId: "5f06ad415dc6be42dcb3a587",
          userId: props.loggedInUserId,
          beneficiaryId: rowValue,
          status: "Submit More info", //Rejected,,More info,Approved
          comments: values.info,
          lang: i18n.language,
        };
        props.handleSubmitPopup(true);
        props.submitPopup(approvereq);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <div className="commentBeneficiries">
          <h3>
            {t("submitMoreInfo")}
            <span
              className="icon icon-Close-outline-button Cursor"
              onClick={() => props.hideSubmitInfo()}
            ></span>
          </h3>
          <Form className="formMargin">
            <div className="formControl">
              <label htmlFor="info">{t("comment")}</label>
              <Field
                name="info"
                component="textarea"
                autoComplete="off"
                className={
                  errors && errors.info && touched && touched.info
                    ? "textBoxBorder formField"
                    : "defaultTextBox formField"
                }
              />

              <div className="errorMessage">
                <ErrorMessage name="info" />
                {props.submitData && props.submitData.message}
              </div>
            </div>

            <button
              className={`btn-primary btn-approve w-100 ${
                props.beneficiariesLoading ? "loadBtn" : ""
              }`}
              type="submit"
            >
              {props.beneficiariesLoading ? "Saving" : t("save")}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SubmitMore;
