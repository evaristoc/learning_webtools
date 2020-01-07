const path = require('path')

//where and name of source file
//const entry = './src/index.js'
//
//where and name of bundled file
//const output={
//    filename:'bundle.js',
//    path:path.resolve(__dirname,'dist')
//}

//above is for just one entry file
//a more general format is as follows:
const entry = {
    myEntry:'./src/index.js'
}
//the output can then change into the alias name of the entry file 
//a hash code can also be added
const output = {
    filename: '[name].bundle.[hash].js',
    path:path.resolve(__dirname,'dist')
    //a good practice is to set a publicPath here when using webpack-server
    //it allows to keep a in-memory dist associated to an specific name, like test
    //this would be even nice if bound to html plugin
    //similarly, loader pathes should be updated according to from where the server is run
    //in my case, for example, it runs from dist, so the full path would be:
    //   localhost:PORT/test/myIndex.html
    //publicPath:'/test'
}

//two modes: development and production
//the way webpack behaves and how the bundled file is created differs by mode
const mode="development"

//devtools are for debugging
//there are 7 types but inline-source-map and source-map are the best ones
//might not be required in development mode
const devtool = 'inline-source-map'

//webpack can monitor changes by adding the --watch option to the command line
//  npx webpack --watch (assuming webpack.config.js is set)
//
//however a better solution is installing and using dev server
//to run it, use:
//  npx webpack-dev-server
//or with a script in package.json
//OBS: remember to call the RIGTH HTML file by its name (in this case its alias)
const devServer = {
    //contentBase:path.resolve(__dirname,'dist'), //FULL PATH where the bundle resides
    contentBase:'./dist', // or path.join(__dirname, 'dist')
    port:9000 //you can select any port: OJO NOT WORKING!!! Only if >> npx webpack-dev-server --port PORT
    //TODO: configuring hot mode (HMR)!
}
//OBS: several complications with webpack-server to solve:
//-- not really running in the assigned port (runs always 8080): it must be set at command-line
//        npx webpack-dev-server --port PORT
//-- not serving the images (now the server is running FROM DIST, so it must be fixed)

//there are several modules and files that require extra configuration
//for that there are
//-- plugins => automatization of tasks
//-- loaders => file processors of different types than js

//here is how to config LOADERS
//(OBS double use of word "module" (mehh..) so it cant be set from outside)
const _module = {
                rules:[

                   {
                        //for plain css, loaders are required
                        //--- style loader (inject the parsed css into the JS files)
                        //--- css loader (handle/parse css files) 
                        test:/\.css$/, //Regex to find all files ending with css
                        use:['style-loader','css-loader'] //loaders: order is RELEVANT! relies on DEPENDENCIES, being the BASE the LAST
                    },
                    
                    {
                        //this rename and locate images, etc into the dist directory and link to them into the corresponding bundled files
                        test: /\.(png|jpg|jpeg|svg|gif)$/,
                        //use:['file-loader'],
                        //
                        //although this save the figures it won't link to the figures unless we provide
                        //a correct relative or absolute path
                        //this is done by setting the publicPath property
                        //the path will reflect the one from which the SERVER is launched
                        //__dirname might not work because it reads ALL THE PATH in the COMPUTER
                        //it can be done in
                        //--- output
                        //--- loader
                        //for this example we do it in loader because:
                        //-- it is smarter (add the slash)
                        //-- it overwrite the publicPath set in output (specific)
                        //so we modify the simple setting of `use` into
                        use: //this can be skipped if only one loader is set (!!! mehhh!!!)
                            [
                                {loader:'file-loader',
                                    options:{
                                        //publicPath:'/dist', //launching my server from the root of the project and check the folder dist
                                        
                                        //correcting publicPath, so it includes new outputPath:
                                        publicPath:'/dist/images',
                                        
                                        //this is a common property to specify a name differently as webpack default hashed naming
                                        name:'myPrefix.[name].[ext]',
                                        
                                        //an additional child path can be created for these files
                                        //HOWEVER it should be added to its loader publicPath IF set in loader
                                        //that is NOT required if publicPath is set in (general) OUTPUT
                                        outputPath:'images/'
                                    }
                                }
                            ]
                    }
                ]
            }
//even that wont manage all css operations
//for example, for loading images from css you need ANOTHER loader (!!!)

//here is how to config PLUGINS
//an example is clean-webpack; it will empty dist every time I run webpack
//OBS: I am installing the recommended version 2 following a correction made in the same course, where version 1 was installed
const {CleanWebpackPlugin} = require('clean-webpack-plugin') 

//another is one handling the bundled files, which can be several with computer-generated names (eg. hashes)
//as all of those file could be hashed, handling its assignment to the index.html should be a manual task ( :( )
//a solution is html-webpack-plugin, used to customise the html file from webpack
//html-webpack will also store the main index.html in the default dist folder
//HOWEVER using html-webpack will AFFECT relative/absolute paths
//-- files stored in dist/childdirectory should be changed into absolute path to include the root server directory
//-- html-webpack sees OUTPUT publicPath as the DEFAULT, not the loader ones (output publicPath overwrites loader publicPath)
//again, all depends from where the server is run
const htmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
            title:'Using html-webpack example',
            filename:'myIndex.html',
            //template:''
            //template: path.resolve(__dirname, 'index.html')
            //template: 'index.html'
        })
]

//console.log(path.resolve(__dirname,'dist'));
module.exports = {
        mode,
        entry,
        output,
        module: _module,
        plugins,
        devtool,
        //devServer
        }