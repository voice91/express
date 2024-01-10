module.exports = {
  plugins: [['module-resolver', {
    root: ['./'],
    alias: {
      controllers: './controllers',
      services: './services',
      middlewares: './middlewares',
      validations: './validations',
      models: './models',
      routes: './routes',
      utils: './utils',
      docs: './docs',
      appEvents: './appEvents'
    }
  }]]
};