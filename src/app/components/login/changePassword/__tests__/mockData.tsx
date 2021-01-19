/* import {
  ICompanyInfoState,
  defaultSignInState,
  defaultCompanyInfoState,
  ISignInState,
} from "../CreateUserProfile.actionTypes"; */
import { IProps } from "../ChangePassword.component";

/* export const mockCompanyInfoData: ICompanyInfoState = {
  ...defaultCompanyInfoState,
  companyName: "Jazeera",
  companyNameAr: "الجزيرة",
};
 */
export const changePasswordProps: IProps = {
  changePasswordCall: jest.fn(),
  showPwdScreen: false,
  changePwdState: { status: "success", message: "Please Login Again" },
};
