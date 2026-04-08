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

export interface TradingPlanList {
  id: number;
  ticker: string;
  order_type: string;
  price: number;
  lot: number;
  expiry: string;
  status: string;
  user_broker: {
    id: number;
    account_number: number;
    notes: string;
    broker: {
      name: string;
      ticker: string;
      type: string[];
    };
  };
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

export interface MyTradingPlanResponse {
  status: boolean;
  message: string;
  data: TradingPlanList[];
  options: Options;
}

export interface AddTradingPlanResponse {
  status: boolean;
  message: string;
  data: TradingPlanList;
}


export interface EditTradingPlanResponse {
  status: boolean;
  message: string;
  data: number[];
}
