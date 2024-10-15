import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

const defaultMessage = "Are you sure to leave without save?"

export function useConfirmation(dirty: boolean, { message = defaultMessage }) {
	const Router = useRouter()

	const onRouteChangeStart = useCallback(() => {
		if (dirty) {
			if (window.confirm(message)) {
				return true
			}
			throw "Abort route change by user's confirmation."
		}
	}, [dirty, message])

	useEffect(() => {
		Router.events.on("routeChangeStart", onRouteChangeStart)

		return () => {
			Router.events.off("routeChangeStart", onRouteChangeStart)
		}
	}, [onRouteChangeStart])


	return
}
