import asyncHandler from 'express-async-handler';
import { clerkClient } from '@clerk/express'

export const clerkAuth = asyncHandler(async (req, res) => {
    try {
        // expect orgId to be passed as a query parameter
        const orgId = req.query.orgId;
        const response = await clerkClient.users.getUserList({
            organizationId: [orgId]
        });
        const users = response.map(user => ({
            id: user.id,
            name: user.fullName || user.primaryEmailAddress?.emailAddress || 'Anonymous'
        }));
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
