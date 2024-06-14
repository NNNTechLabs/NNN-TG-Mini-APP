import { http } from '../../services';
import { User } from '../../types';
interface DailyCheckinDetailsOutputProp {
	status: boolean;
	day: number;
	TotalDayCounter: number;
	TodayRewards: number;
	MysteryBox: boolean;
	CanClaimDailyReward: boolean;
	CanClaimMysteryBox: boolean;
	message: string;
}
export const DailyCheckinDetails = async (
): Promise<{ data: DailyCheckinDetailsOutputProp; status: boolean }> => {
	return await http.get("users/getCheckinDetails");
};

interface ClaimDailyRewardsOutputProp {
	status: boolean;
	message: string;
	data: User
}
export const ClaimDailyRewards = async (
): Promise<{ data: ClaimDailyRewardsOutputProp; status: boolean }> => {
	return await http.get("users/dailycheckin");
};