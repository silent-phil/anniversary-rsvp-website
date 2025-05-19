export interface Model {
  id: number | string;
}

export interface User extends Model {
  email: string;
  createdAt: number;
}

export interface Invitee extends Model {
  name: string;
  accepted: boolean;
  registeredAt: number;
  user: string;
  by: string | undefined;
}

export interface Settings {
  registrationActive: boolean,
  redactNames: boolean,
  updatedAt: number,
}

export interface UserState {
  userId: string;
  authorized: boolean;
}

export type ValidatorResult = {  
  valid: boolean;
  error: string;
};

export interface NavItem {
  class: string;
  name: string;
  ref: string;
}
