module.exports = {
  apps: [
    {
      name: 'Gainium Content API',
      interpreter: 'bash',
      script: 'npm.sh',
      args: 'start',
      watch: false,
    },
  ],
}
