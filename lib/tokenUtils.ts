import branca from "branca"
import dayjs from "dayjs"

export function decodeToken(token: string): string {
	const brancaDecoder = branca(process.env.SECRET_KEY!)

	const timestamp = dayjs.unix(brancaDecoder.timestamp(token))
	if (timestamp.isBefore(dayjs().subtract(1, "day"))) {
		throw new Error("Token expired")
	}

	return brancaDecoder.decode(token).toString()
}

export function verifyToken(token: string): boolean {
	try {
		const brancaDecoder = branca(process.env.SECRET_KEY!)

		const timestamp = dayjs.unix(brancaDecoder.timestamp(token))
		if (timestamp.isBefore(dayjs().subtract(1, "day"))) {
			return false
		}

		brancaDecoder.decode(token)
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export function createToken(payload: string): string {
	const brancaEncoder = branca(process.env.SECRET_KEY!)
	return brancaEncoder.encode(payload, dayjs().unix())
}
