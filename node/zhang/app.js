var glob = require("glob");
var vfs = require('vinyl-fs');


// options is optional
// glob("../../learning/**/*.doc?", {absolute:true}, function (er, files) {
//   // files is an array of filenames.
//   // If the `nonull` option is set, and nothing
//   // was found, then files is ["**/*.js"]
//   // er is an error object or null.
//   console.log(files);
// })


// ----------

vfs.src('**/*.js').pipe(vfs.dest('./zhang'));
