const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup/test-setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'controllers/**/*.js',
        'middlewares/**/*.js',
        'services/**/*.js',
        'routes/**/*.js'
      ],
      exclude: ['node_modules/**', 'tests/**']
    }
  }
});