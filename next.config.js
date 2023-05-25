/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {},
  experimental: {
    appDir: true,
    forceSwcTransforms: true
  },
  output: 'export',
  images: {
    domains: [
      'https://lh3.googleusercontent.com',
      'ticmais.s3.sa-east-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'caceresnoticias.nyc3.digitaloceanspaces.com',
      'scontent.fppb1-1.fna.fbcdn.net',
      'static-meuevento.s3.dualstack.us-east-1.amazonaws.com',
      'cdn2.downdetector.com',
      '1000logos.net',
      'images.sympla.com.br',
      'www.oab-ro.org.br',
      'cands-cands.com',
      'vogueballroom.com.au',
      'pymstatic.com',
      'img.freepik.com',
      'countryflagsapi.com',
      'vetores.org',
      'www.spcdn.org',
      'media.licdn.com',
      'api.ticmais.ticpass.com.br'
    ]
  },
  compiler: {}
}

module.exports = nextConfig
