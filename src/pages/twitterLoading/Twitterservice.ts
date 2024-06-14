import { http } from '../../services';
interface InputProp {
	code: string;
	address: string;
	codeVerifier: string;
}
interface ResponseProp {
	status: boolean;
	message: string;
	jwt_token: string;

}
export const loginwithTwitter = async (data: InputProp): Promise<{
	data: ResponseProp, status: boolean
}> => {
	return await http.post('users/loginwithtwitter', data);
};