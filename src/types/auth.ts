interface Options {
  page: number;
  limit: number;
  total: number;
}

export interface Profile {
  id: number;
  fullname: string;
  username: string;
  email: string;
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: Profile;
}

export interface Broker {
  id: number;
  name: string;
}

export interface MyBrokers {
  id: number;
  account_number: number;
  notes: string;
  broker: Broker;
}

export interface MyBrokerResponse {
  status: boolean;
  message: string;
  data: MyBrokers[];
  options: Options;
}

export interface DeleteBrokerResponse {
  status: boolean;
  message: string;
  data: number;
}
