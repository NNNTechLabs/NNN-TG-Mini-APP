import { http } from "../../services";
import { User } from "../../types";

interface signupinputprop {
  ReferralCode: string;
  walletAddress: string;
  username: string;
  telegram_id: string;
  telegram_username: string;
  PictureURL: string;
}
interface SignupResponseProp {
  message: string;
  status: boolean;
  authtoken: string;
  UserDetails: {
    user: User;
  };
}
export const UserSignup = async (
  data: signupinputprop
): Promise<{ data: SignupResponseProp; status: boolean }> => {
  return await http.post("users/signup", data);
};
