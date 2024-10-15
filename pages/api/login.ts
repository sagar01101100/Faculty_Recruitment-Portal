import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import argon2 from "argon2";
import { createToken } from "../../lib/tokenUtils";

interface User {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password }: User = req.body;

  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      failedLoginAttempts: true, // Include failed login attempts
    },
  });

  if (!user) {
    return res.status(400).json({ error: "Email or password is invalid" });
  }

  // Check if the account is locked
  const lockoutThreshold = 5; // Maximum attempts before lockout
  const lockoutDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

  // Get recent failed login attempts
  const recentFailedAttempts = user.failedLoginAttempts.filter(attempt =>
    new Date(attempt.timestamp) >= new Date(Date.now() - lockoutDuration)
  );

  if (recentFailedAttempts.length >= lockoutThreshold) {
    return res.status(403).json({
      error: "Account is locked due to multiple failed login attempts. Please try again later.",
    });
  }

  // Verify the password
  const match = await argon2.verify(user.password, password + user.salt);

  if (!match) {
    // Record the failed login attempt
    await prisma.failedLoginAttempt.create({
      data: {
        userId: user.id,
      },
    });

    return res.status(400).json({ error: "Email or password is invalid" });
  }

  // Clear failed login attempts on successful login
  await prisma.failedLoginAttempt.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Create and return token
  const token = createToken(user.id);

  res.json({ token });
}




// import type { NextApiRequest, NextApiResponse } from "next"
// import prisma from "../../lib/prisma"
// import argon2 from "argon2"
// import { createToken } from "../../lib/tokenUtils"

// interface User {
// 	email: string
// 	password: string
// }

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	let user: User = req.body
// 	let found = await prisma.user.findUnique({
// 		where: {
// 			email: user.email,
// 		},
// 	})
// 	if (found == null) {
// 		res.status(400).json({
// 			error: "Email or password is invalid",
// 		})
// 		return
// 	}
// 	let match = await argon2.verify(
// 		found!.password,
// 		user.password + found!.salt
// 	)
// 	if (!match) {
// 		res.status(400).json({
// 			error: "Email or password is invalid",
// 		})
// 		return
// 	}
// 	const token = createToken(found!.id)

// 	res.json({
// 		token: token,
// 	})
// }