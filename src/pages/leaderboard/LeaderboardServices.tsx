import { http } from "../../services";
import { User } from "../../types";

interface AllTimeLeaderboardOutputProp {
  status: boolean;
  List: List[];
  Totalpage: number;
  CurrentPage: number;
}
export interface List {
  _id: string;
  TotalRewards: number;
  UserID: UserInfo;
}
export interface UserInfo {
  userName: string;
  Energy: number;
  KOLAccount: boolean;
  rewardCoins: number;
  userAvatar?: string;
}
export interface AllTimeLeaderboard {
  _id: string;
  TotalRewards: number;
  User: User;
}
export const AllTimeLeaderboardApi = async (
  pagenumber: number
): Promise<{
  data: AllTimeLeaderboardOutputProp;
  status: boolean;
}> => {
  return await http.get(`leaderboard/individual/alltime/${pagenumber}`);
};
export const CurrentweekLeaderboardApi = async (
  pagenumber: number
): Promise<{
  data: AllTimeLeaderboardOutputProp;
  status: boolean;
}> => {
  return await http.get(`leaderboard/individual/currentweek/${pagenumber}`);
};
export const PreviousweekLeaderboardApi = async (
  pagenumber: number
): Promise<{
  data: AllTimeLeaderboardOutputProp;
  status: boolean;
}> => {
  return await http.get(`leaderboard/individual/previousweek/${pagenumber}`);
};
