import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "../../lib/tokenUtils"

export default function verify(req: NextApiRequest, res: NextApiResponse) {
	res.json({
		"status": verifyToken(req.body.token),
	})
}
