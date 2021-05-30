export interface QueryData {
  changePassword: {
    _id?: string;
  };
}

export interface QueryVars {
  currentPassword: string;
  newPassword: string;
}
