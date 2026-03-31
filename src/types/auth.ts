export interface Profile {
    id: number;
    fullname: string;
    username: string;
    email: string
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: Profile;
}