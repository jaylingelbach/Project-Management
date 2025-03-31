import asyncHandler from 'express-async-handler';
import { clerkClient, getAuth } from '@clerk/express'
import { Liveblocks } from '@liveblocks/node';
import dotenv from 'dotenv';
dotenv.config();

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET
  });

export const authEndpoint = asyncHandler(async (req, res) => {
        const { room } = req.body;
        if (!room) {
          return res.status(400).json({ error: 'Room is required' });
        }
      
        // Extract Clerk authentication info from the request
        const { userId } = getAuth(req);
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      
        const user = await clerkClient.users.getUser(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      
        // Prepare a Liveblocks session for the given room and user
        const session = liveblocks.prepareSession(
          userId,
          room,
          { userInfo: { name: user.fullName || 'Anonymous' } }
        );
      
        if (!session) {
          return res.status(500).json({ error: 'Failed to prepare session' });
        }
      
        session.allow(`${room}:*`, session.FULL_ACCESS);
      
        // Authorize the session to generate a token
        const result = await session.authorize();
      
        let tokenData;
        try {
          tokenData = JSON.parse(result.body);
        } catch (error) {
          console.error("Failed to parse token data:", error);
          return res.status(500).json({ error: 'Token generation failed' });
        }
      
        if (!tokenData.token) {
          return res.status(500).json({ error: 'Token not generated' });
        }
      
        return res.json({ token: tokenData.token });
      });