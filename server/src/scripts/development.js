process.env.NODE_ENV = 'development';

const nodemon = require('nodemon');
nodemon('--watch server ./index.js');

nodemon.on('start', function(){
    console.log('[nodemon] App has started');
}).on('quit', function(){
    console.log('[nodemon] App has quit');
}).on('restart', function(file){
    console.log('[nodemon] App restarted due to:', file);
});