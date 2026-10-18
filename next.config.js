/** @type {import('next').NextConfig} */
const nextConfig = {
  // Family Quiz s'appelle désormais Hydra Quiz : les anciens liens suivent.
  async redirects() {
    return [{ source: '/family-quiz', destination: '/hydra-quiz', permanent: true }];
  },
};
module.exports = nextConfig;
