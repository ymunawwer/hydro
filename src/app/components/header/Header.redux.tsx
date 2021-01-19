import { connect } from "react-redux";
import { Dispatch } from "redux";
import Header from "./Header.component";
import { logout, resetLogout, changeLanguage } from "./Header.action";
import { IReduxLogoutState, LogoutActionTypes } from "./Header.actionTypes";
//import { reset_user } from "../../components/login/Login.action";

export const mapStateToProps = (state: IReduxLogoutState) => {
  return {
    isUserLogout: state.userLogout && state.userLogout.success,
    loggedInUser: state.user?.data,
    langAr: state.userLogout.langAr,
    langEn: state.userLogout.langEn,
    loggedInCompany: state.user.data ? state.user.data.fk_company_id : "",
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleLogout: () => dispatch(logout()),
    resetLogout: () => dispatch(resetLogout()),
    changeLanguage: (lang: string) => dispatch(changeLanguage(lang)),
    //resetUser: () => dispatch(reset_user()),
    resetAppState: () => dispatch({ type: LogoutActionTypes.DESTROY_SESSION }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
