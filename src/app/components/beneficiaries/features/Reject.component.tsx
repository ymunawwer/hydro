import React, { useEffect } from "react";
import { approveFlow, IProps } from "../Beneficiaries.actionTypes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../../utils/Yup.validation";
import { useTranslation } from "react-i18next";
const Ireject = (props: IProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Formik
      initialValues={{ reject: "" }}
      validationSchema={yupSchema.BeneficiaryRejectForm}
      onSubmit={(values, { setSubmitting }) => {
        let val = props.approvalRequest;
        let rowValue = [];
        rowValue.push(val && val.original && val.original._id);
        let approvereq: approveFlow = {
          //userId: "5f06ad415dc6be42dcb3a587",
          userId: props.loggedInUserId,
          beneficiaryId: rowValue,
          status: "Rejected", //Rejected,,More info,Approved
          comments: values.reject,
          lang: i18n.language,
        };
        props.handleReject(approvereq);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <div className="commentBeneficiries">
          <h3>
            {t("commentReject")}
            <span
              className="icon icon-Close-outline-button Cursor"
              onClick={() => props.hideRejectInfo()}
            ></span>
          </h3>
          <Form className="formMargin">
            <div className="formControl">
              <label htmlFor="reject">{t("comment")}</label>
              <Field
                name="reject"
                component="textarea"
                autoComplete="off"
                className={
                  errors && errors.reject && touched && touched.reject
                    ? "textBoxBorder formField"
                    : "defaultTextBox formField"
                }
              />

              <div className="errorMessage">
                <ErrorMessage name="reject" />
                {props.rejectComments && props.rejectComments.message}
              </div>
            </div>
            {/* <div className="errorMessage">{props.editGroups.message}</div> */}

            <button
              className={`btn-primary btn-reject w-100 ${
                props.beneficiariesLoading ? "loadBtn" : ""
              }`}
              type="submit"
            >
              {props.beneficiariesLoading ? t("sending") : t("send")}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Ireject;
