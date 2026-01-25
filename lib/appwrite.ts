import "react-native-url-polyfill/auto";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import type { CreateUserParams, SignInParams } from "./appwrite.types";

// Appwrite Configuration
export const appwriteSetup = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.anusatya-choudhary.food-delivery-app",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
};

// Initialize Appwrite Client
export const client = new Client()
  .setEndpoint(appwriteSetup.endpoint!)
  .setProject(appwriteSetup.projectId!)
  .setPlatform(appwriteSetup.platform);

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);


export const createUser = async ({ name, email, password }: CreateUserParams) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    if (!newAccount) {
      throw new Error('Failed to create user');
    }

    await signIn({ email, password });

    const avatarURL = avatars.getInitialsURL(name);

    return await databases.createDocument({
      databaseId: appwriteSetup.databaseId!,
      collectionId: 'users',
      documentId: ID.unique(),
      data: {
        accountId: newAccount.$id,
        name,
        email,
        photo: avatarURL,
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({ email, password });
    return session;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};