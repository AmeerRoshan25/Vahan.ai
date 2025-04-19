
/**
 * Represents user details.
 */
export interface UserDetails {
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The phone number of the user.
   */
  phoneNumber: string;
  /**
   * The password of the user.
   */
  password: string;
}

const USERS_FILE = 'users.json';

/**
 * Asynchronously retrieves user details for a given user.
 *
 * @param phoneNumber The phone number of the user to retrieve details for.
 * @returns A promise that resolves to a UserDetails object containing user information.
 */
export async function getUserDetails(phoneNumber: string): Promise<UserDetails | null> {
  try {
    const users = await readUsersFromFile();
    const user = users.find((u: UserDetails) => u.phoneNumber === phoneNumber);
    return user || null;
  } catch (error) {
    console.error('Error reading user details:', error);
    return null;
  }
}

/**
 * Asynchronously stores user details.
 *
 * @param userDetails The details of the user to store.
 * @returns A promise that resolves when the user details are successfully stored.
 */
export async function storeUserDetails(userDetails: UserDetails): Promise<void> {
  try {
    const users = await readUsersFromFile();
    users.push(userDetails);
    await writeUsersToFile(users);
  } catch (error) {
    console.error('Error storing user details:', error);
    throw error;
  }
}

async function readUsersFromFile(): Promise<UserDetails[]> {
  try {
    // Next.js doesn't directly support reading files from the file system in a client component.
    // This code is intended for a server-side environment.
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(process.cwd(), USERS_FILE);
    try {
      await fs.access(filePath);
    } catch (error) {
      // File does not exist, create it with an empty array
      await fs.writeFile(filePath, JSON.stringify([]));
    }
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users from file:', error);
    return [];
  }
}

async function writeUsersToFile(users: UserDetails[]): Promise<void> {
  try {
    // Next.js doesn't directly support writing files from the file system in a client component.
    // This code is intended for a server-side environment.
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(process.cwd(), USERS_FILE);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users to file:', error);
    throw error;
  }
}
