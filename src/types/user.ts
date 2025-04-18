export type AuthData = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  token: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}
