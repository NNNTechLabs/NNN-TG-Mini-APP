import { http } from "../../services";
import { User } from "../../types";
interface SquadListOutputProp {
  status: boolean;
  AllSquads: AllSquad[];
  user_current_squad: UserCurrentSquad;
}
export interface UserCurrentSquad {
  _id: string;
  SquadCode: string;
  SquadName: string;
  UserID: string;
  RankName: string;
  RankNumber: number;
  IsLeftByOwner: boolean;
  createdAt: string;
  updatedAt: string;
  totalRewards: number;
}
export interface AllSquad {
  _id: string;
  SquadCode: string;
  SquadName: string;
  UserID: string;
  RankName: string;
  RankNumber: number;
  IsLeftByOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalRewards: number;
}
export const SquadListApi = async (): Promise<{
  data: SquadListOutputProp;
  status: boolean;
}> => {
  return await http.get("squad/getListOfAvailableSquad");
};
interface joinsquadbycodeinputProp {
  SquadCode: string;
}
interface joinsquadbycodeOutputProp {
  status: boolean;
  userDetails: User;
  SquadInfo: SquadInfo;
  message: string;
}

export interface SquadInfo {
  _id: string;
  SquadCode: string;
  SquadName: string;
  UserID: string;
  RankName: string;
  RankNumber: number;
  IsLeftByOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const joinSquadByCodeApi = async (
  data: joinsquadbycodeinputProp
): Promise<{
  data: joinsquadbycodeOutputProp;
  status: boolean;
}> => {
  return await http.post("squad/JoinSquadByCode", data);
};

interface LeaveSquadOutputProp {
  status: boolean;
  message: string;
}
export const leaveSquadApi = async (): Promise<{
  data: LeaveSquadOutputProp;
  status: boolean;
}> => {
  return await http.get("squad/LeaveSquad");
};
interface getSquadinfoInputProps {
  SquadCode: string;
}
interface getSquadinfoOutputProps {
  SquadsInfo: SquadInfo;
  status: boolean;
}
export const getSquadinfoApi = async (
  data: getSquadinfoInputProps
): Promise<{
  data: getSquadinfoOutputProps;
  status: boolean;
  message: string;
}> => {
  return await http.post("squad/getSquadInfo", data);
};
interface joinsquadbylinkinputProp {
  SquadCode: string;
  userId: string;
}
export const JoinSquadByLink = async (
  data: joinsquadbylinkinputProp
): Promise<{
  data: getSquadinfoOutputProps;
  status: boolean;
}> => {
  return await http.get(
    `squad/JoinSquadByLink/${data?.userId}/${data?.SquadCode}`
  );
};
