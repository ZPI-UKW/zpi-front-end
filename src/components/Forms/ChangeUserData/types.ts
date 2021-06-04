export interface QueryData {
  changeUserData: {
    _id: string;
    email: string;
    name: string;
    lastname: string;
    phonenumber: string;
  };
}

export interface QueryVars {
  email: string;
  name: string;
  lastname: string;
  phonenumber: string;
}
