'use server';

import { revalidatePath } from 'next/cache';
import { UserDetails } from '@/services/user-authentication';

const USERS_FILE = 'users.json';

export async function storeUserDetails(userDetails: UserDetails): Promise<void> {
  try {
    const users = await readUsersFromFile();
    users.push(userDetails);
    await writeUsersToFile(users);
    revalidatePath('/'); // Invalidate the cache for the home page
  } catch (error: any) {
    console.error('Error storing user details:', error);
    throw new Error('Failed to store user details.');
  }
}

export async function getUserDetailsByPhoneNumber(phoneNumber: string): Promise<UserDetails | null> {
  try {
    const users = await readUsersFromFile();
    const user = users.find((user: UserDetails) => user.phoneNumber === phoneNumber);
    return user || null;
  } catch (error: any) {
    console.error('Error retrieving user details:', error);
    return null;
  }
}


async function readUsersFromFile(): Promise<UserDetails[]> {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(process.cwd(), USERS_FILE);
    try {
      await fs.access(filePath);
    } catch (error) {
      // File does not exist, create it with an empty array
      await fs.writeFile(filePath, JSON.stringify([]), 'utf8');
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
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(process.cwd(), USERS_FILE);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing users to file:', error);
    throw new Error('Failed to write users to file.');
  }
}
