/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/admin",
				destination: "/admin/login",
				permanent: true,
			},
		]
	},
	api: {
    responseLimit: false
    // responseLimit: '8mb',
  },
}
