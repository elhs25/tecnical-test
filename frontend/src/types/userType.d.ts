interface ISignIn {
  username: string;
  password: string;
}

interface ISignUp extends ISignIn {
  name: string;
}

interface IUser {
  username: string;
  name: string;
  photo: string;
  id: string;
  token?: string;
}

interface UserState extends BaseActionState {
  user?: IUser;
}

interface UserAction {
  type: string;
  payload: UserState;
}

interface SignInAction {
  type: string;
  payload: ISignIn;
}

interface SignUpAction {
  type: string;
  payload: ISignUp;
}