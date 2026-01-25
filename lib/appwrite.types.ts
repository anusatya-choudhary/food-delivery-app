// Appwrite User Types
export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}


export interface SignInParams {
  email: string;
  password: string;
}