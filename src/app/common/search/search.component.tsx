import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import { yupSchema } from "../../utils/Yup.validation";
import { useTranslation } from "react-i18next";
export interface IProps {
  formSubmit: (values: ISearchKey) => void;
  resetSearch: (values: ISearchKey) => void;
  search?: string;
  loading?: boolean;
  currentTab?: string;
}

export interface ISearchKey {
  search: string;
}

const AutoResetOnTabChange = ({ tab }) => {
  const { resetForm } = useFormikContext();

  React.useEffect(() => {
    resetForm();
  }, [tab]);

  return null;
};

const Search = (props: IProps) => {
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (search) {
      setSearch(props.loading);
    }
  }, [props.loading]);

  const { t } = useTranslation();
  return (
    <div className="searchBox">
      <Formik
        initialValues={{ search: props.search || "" }}
        validationSchema={yupSchema.Search}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values: ISearchKey, { setSubmitting }) => {
          props.formSubmit(values);
          setSubmitting(false);
          setSearch(true);
        }}
      >
        {({ values, setFieldValue, touched, resetForm }) => (
          <Form>
            <div className="inpGroup">
              <div className="inpGroupPrepend">
                <i className="icon-search Cursor"></i>
              </div>
              <div className="inpBlock">
                <Field
                  name="search"
                  className="formField"
                  type="text"
                  autoComplete="off"
                />
                {values.search && touched.search && (
                  <span
                    className="clearBtn icon-Close-outline-button Cursor"
                    onClick={() => {
                      resetForm();
                      props.resetSearch(values);
                    }}
                  ></span>
                )}
              </div>
              <div className="inpGroupAppend">
                <button
                  className={`btn ${props.loading && search ? "loadBtn" : ""}`}
                  type="submit"
                >
                  {props.loading && search ? "Searching..." : t("search")}
                </button>
              </div>
            </div>
            <div className="errorLabel">
              <ErrorMessage name="search" />
            </div>
            <AutoResetOnTabChange tab={props.currentTab} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
