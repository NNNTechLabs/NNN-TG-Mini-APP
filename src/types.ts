export type HomeProps = Array<{
  path: string;
  element: JSX.Element;
}>;

export interface LoginResponse {
  status: boolean;
  jwt_token: string;
  data: User;
}

interface GameQuestsProps {
  name: string;
  points: number;
  expirationDate: string;
  id: string;
  onClick?: () => void;
  isCompleted: boolean;
  imageSrc?: string;
}

export interface GameMission {
  name: string;
  category: string;
  totalReward: number;
  imageSrc: string;
  playLink: string;
  missionLink: string;
  linkLink: string;
  description?: string;
  gameQuests?: GameQuestsProps[];
}

export interface PlaceholderQuest {
  name: string;
  points: number;
  expirationDate: string;
  id: string;
}

export interface QuestCardProps {
  quest: PlaceholderQuest;
}

export interface DailyClaim {
  day: number;
  points: number;
  isClaimed: boolean;
}

export interface User {
  walletAddress: string;
  userName: string;
  userAvatar: string;
  jwt_token: string;
  ReferralCode: string;
  Tier: number;
  KOLAccount: boolean;
  signed: boolean;
  rewardCoins: number;
  LastClaim: null;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameUIDProps {
  gameName: string;
  gameUID: string;
}

export interface ItemsTutorialProps {
  imageSrc: string;
  itemTitle: string;
  itemDescription: JSX.Element;
}

export interface GameState {
  level: number;
  energy: number;
  maxEnergy: number;
  clickEarnEnergy: number;
  recoveryEnergyPerSecond: number;
}

export interface TamabotContentProps {
  userTamabot: GameState;
  alienImageLevelHandler: (level: number) => string;
  userEnergyCount: number;
  setIsUpgrading: (value: boolean) => void;
  isClicking: boolean;
}

export interface TamabotUpgradeProps {
  userTamabot: GameState;
  setIsUpgrading: (value: boolean) => void;
  alienImageLevelHandler: (level: number) => string;
  isClicking: boolean;
}

export interface GifPositionProps {
  top: number;
  left: number;
  rotation: number;
}

export interface MissionComponentProps {
  setNavIndex: (index: number) => void;
}
