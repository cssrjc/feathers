export interface UserItem {
  studentID: string
  feathers: number
}

export interface RewardItem {
  id: string;
  link: string;
  name: string;
  price: number;
  stock: boolean;
}

export interface EventItem {
  id: string;
  link: string;
  name: string;
  description: string;
  redeem: boolean;
  earn: boolean;
}