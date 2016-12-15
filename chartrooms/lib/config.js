exports.serverPort = 9000;

exports.nodemon = {
  script: 'server.js',
  // ext: 'js html css',
  env: { 'NODE_ENV': 'development' }
}

exports.less = {
  paths: ['public/less']
}

exports.livereload = {
  port: 8080,
  livereload: true,
  root: 'public'
}
