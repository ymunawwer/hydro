import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import ChangePassword from "../ChangePassword.component";

import { changePasswordProps } from "./mockData";

afterEach(cleanup);

describe("Create User Profile page CompanyInfo component  test cases", () => {
  test("new module should be created", async () => {
    const history = createMemoryHistory();
    //  expect(history.location).toEqual("");
    function App() {
      return (
        <div>
          <Switch>
            {/* <Route exact path="/masterdata/modules/all" component={Modules} /> */}
            <Route
              path="/changePassword"
              //component={CreateModule}
              component={() => (
                <ChangePassword
                  {...changePasswordProps}
                  location={history.location}
                ></ChangePassword>
              )}
            />
          </Switch>
        </div>
      );
    }

    //const history = createMemoryHistory();
    history.push("/changePassword?token=dGVqYUBvbmVzaW5nbGV2aWV3LmNvbQ==");

    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(getByText("Current Password")).toBeInTheDocument();

    const currentPassword = container.querySelector(
      'input[name="currentPassword"]'
    );
    const newPassword = container.querySelector('input[name="newPassword"]');
    const confirmPassword = container.querySelector(
      'input[name="confirmPassword"]'
    );

    const submitButton = container.querySelector('button[type="submit"]');

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    expect(getByText("Current Password is required")).toBeInTheDocument();

    currentPassword &&
      (await wait(() => {
        fireEvent.change(currentPassword, {
          target: {
            value: "newValue",
          },
        });
      }));

    newPassword &&
      (await wait(() => {
        fireEvent.change(newPassword, {
          target: {
            value: "123456789",
          },
        });
      }));

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    expect(
      getByText(
        "Password must contain atleast one uppercase one lower case one special character one number"
      )
    ).toBeInTheDocument();

    newPassword &&
      (await wait(() => {
        fireEvent.change(newPassword, {
          target: {
            value: "123456789",
          },
        });
      }));
    newPassword &&
      (await wait(() => {
        fireEvent.change(newPassword, {
          target: {
            value: "YKTeja@122",
          },
        });
      }));

    confirmPassword &&
      (await wait(() => {
        fireEvent.change(confirmPassword, {
          target: {
            value: "YKTeja@124",
          },
        });
      }));

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));

    expect(getByText("Passwords do not match")).toBeInTheDocument();

    newPassword &&
      (await wait(() => {
        fireEvent.change(newPassword, {
          target: {
            value: "YKTeja@122",
          },
        });
      }));

    confirmPassword &&
      (await wait(() => {
        fireEvent.change(confirmPassword, {
          target: {
            value: "YKTeja@122",
          },
        });
      }));

    submitButton &&
      (await wait(() => {
        fireEvent.click(submitButton);
      }));
  });

  test("responsive from api", () => {
    const { getByText, rerender } = render(
      <ChangePassword {...changePasswordProps} showPwdScreen={true} />
    );

    expect(
      getByText(changePasswordProps.changePwdState.message)
    ).toBeInTheDocument();

    //failed  case

    let props = {
      ...changePasswordProps,
      showPwdScreen: true,
      changePwdState: { status: "failed", message: "Password Change Failed" },
    };
    rerender(<ChangePassword {...props} />);

    //expect(getByText("Password Change Failed")).toBeInTheDocument();
  });
});
