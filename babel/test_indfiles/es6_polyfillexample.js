//babel polyfill will find the correct source code for each operator / function
//at the core.js module and others in order to make that ES6 function translate
//into ES5
//See es5_polylfillexample.js

let func = async (arg1)=>{
    console.log(arg1)
}

func('hello')