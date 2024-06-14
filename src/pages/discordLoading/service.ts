import { http } from "../../services/index";
import { User } from '../../types';

interface LoginWithDiscordData {
	code: string | null;
	state: string | null;
	wallet_Address: string;
}

interface ApiResponse {

	status: boolean;
	user: User;
	message: string;
	jwt_token: string;

}

export const loginwithdiscord = async (data: LoginWithDiscordData): Promise<{
	data: ApiResponse, status: boolean
}> => {
	return await http.post('users/loginwithdiscord', data);
};
