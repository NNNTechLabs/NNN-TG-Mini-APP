import { http } from '../../services';
// types.ts
export interface SocialAuthProp {
	discordauth: boolean;
	twitterauth: boolean;
}
export interface Quest {
	missionName: string;
	Rewards: number;
	Link: string;
	isDone: number;
}
export interface TwitterQuestCardProps {
	quest: TwitterProp;
	missionexpirydate: string;
}
export interface QuestCardProps {
	quest: Quest;
	missionexpirydate: string;
}

export interface SocialQuestOutputProps {
	status: boolean;
	message: string;
	DiscordData: QuestProps[] | [];
	TelegramData: QuestProps[] | null;
	TwitterData: TwitterProp[] | [];
	DiscordAuth: boolean;
	TwitterAuth: boolean;
	QuestEndDate: string;
}

export interface QuestProps {
	_id: string;
	Link: string;
	Type: number;
	isDone: number;
	missionName: string;
	Rewards: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface TwitterProp {
	_id: string;
	Link: string;
	Follow: boolean;
	Like: boolean;
	missionName: string;
	Retweet: boolean;
	Comment: boolean;
	FollowRewards: number;
	LikeRewards: number;
	RetweetRewards: number;
	isDone: number;
	CommentRewards: number;
	createdAt: Date;
	updatedAt: Date;
}
interface AuthDiscordOutputProps {
	status: boolean;
	message: string;
	redirectUrl: string
}
interface AuthTwitterOutputProps {
	data: {
		url: string;
		codeVerifier: string;
	};
}
interface twitterInputProp {
	walletAddress: string;
}
interface TwitterOutputProps {
	data: {
		url: string;
		codeVerifier: string;
	};
}
export const SocialQuestListApi = async (
): Promise<{ data: SocialQuestOutputProps; status: boolean }> => {
	return await http.get("social/getSocialQuestList");
};
export const AuthDiscordApi = async (walletAddress: string
): Promise<{ data: AuthDiscordOutputProps; status: boolean }> => {
	return await http.post("users/authwithdiscord", { walletAddress });
};
export const AuthTwitterApi = async (walletAddress: string
): Promise<{ data: AuthTwitterOutputProps; status: boolean }> => {
	return await http.post("users/authwithtwitter", walletAddress);
};

export const TwitterAuthApi = async (
	data: twitterInputProp
): Promise<{ data: TwitterOutputProps; status: boolean }> => {
	return await http.post("users/authwithtwitter", data);
};