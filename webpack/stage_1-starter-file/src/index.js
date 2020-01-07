//webpack is a bundler; it will take all the js/css/etc files and put all the code inside
//one single file to be read by your main html view
//
//also by default webpack use production mode, so if in dev that should be stated
//
//if not config, webpack will point to any file called src/index.js, otherwise it wont work
//
//our exercise is config to use this src/index.js

//import {one, two, three} from '../js/func_list.js'
//
//one()
//
//two()
//
//three()

//the usual way to present webpack with the js files required is by requiring them
require('../js/first.js')
require('../js/second.js')
require('../js/third.js')
//with no other config and default mode production the bundled minified files will be sent to ../dist/main.js by default
//with --mode=development the bundled file will be showed in FULL (not minified)
//
//webpack cannot handle plain css files: it need LOADERS
require('../css/main.css')