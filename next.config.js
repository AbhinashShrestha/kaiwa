/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        swcPlugins: [
            ["next-superjson-plugin",{}]
        ]
    },
    images:{
      domains:[
        "lh3.googleusercontent.com",
        "res.cloudinary.com",
        "placewaifu.com"
    ]
    }
}

module.exports = nextConfig
