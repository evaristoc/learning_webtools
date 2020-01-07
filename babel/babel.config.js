//we installed babel/cli, babel/core and babel/preset-env as dev modules
//and babel/polyfill as prod modules
//cli: command line interface, used to send commands to babel
//core: handles the modules required for translation
//preset-env: plugin for a preset (collection of plugins), used to translate from ES6 to ES5 in browsers

//.babelrc has a smaller range and it is associated specific directories
//but it will overwrite the more general babel.config.js

//module.exports = {
//    presets:[
//        ["@babel/preset-env",
//            {
//                targets:{
//                    //browsers
//                    //if target are browsers that support ES6 syntax babel won't translate into ES5
//                    },
//                "corejs": "2.6.11", //curently an advised step
//                 useBuiltIns:"usage"
//            }
//        ]
//    ]
//}

//presets configuration; preset-env is the translation into js ES5; polyfill will read core.js
const presets = [
        ["@babel/preset-env",
            {
                targets:{
                    //browsers
                    //if target are browsers that support ES6 syntax babel won't translate into ES5
                    },
                "corejs": "2.6.11", //giving version an advised step; corejs is where the translating modules are 
                 useBuiltIns:"usage" //related to what and how polyfill will complete the code translations (required, none, or full)
            }
        ]
    ];

//plugin configuration
const plugins = [
    ["@babel/plugin-proposal-pipeline-operator", {proposal:"minimal"}]
]

module.exports = {presets, plugins}