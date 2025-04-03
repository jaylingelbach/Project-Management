import asyncHandler from 'express-async-handler';
import { clerkClient } from '@clerk/express'

export const clerkAuth = asyncHandler(async (req, res) => {
    try {
        const response = await clerkClient.users.getUserList();
        console.log("Response from Clerk: ", response);
        const users = response.data.map(user => ({
            id: user.id,
            name: user.fullName || user.primaryEmailAddress?.emailAddress || 'Anonymous'
          }));
        console.log("Users fetched from Clerk: ", users);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
