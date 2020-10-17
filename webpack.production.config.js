/* There is a node.js package that helps us generate absolute path.It is called path.Remember in webpack.config.js we must
* use the old way of importing modules.Remember that __dirname is the current directory that this file (webpack.config.js)
exists, and then we specify the directory that we want to output the bundle.js file in second arg. */

/* entry is the file that we import all of our dependencies and webpack will start from this file when running as
a build process. */

/* We need to teach webpack how to import image files into .js files, so we must add a specific rule to config file,
    So first we have to add a new property called module and there we add our rules.Each rule has 2 properties:First
    one is test, and second one is use, where we add our loaders.So now everytime we try to import a jpg file into a 
    js file, webpack will check if it has a rule for it.If it doesn't find a suitable rule it will give an error.
    But if it finds a rule for that kind of file, it will import that file according to that rule.
    For some files webpack knows how to import them by it's heart!Even without any additional loaders, like .js files.
    
    file-loader instructs webpack to copy the required file into the output folder.By default the file name 
    (image name) of the resulting file is md5 hash of the file (image) contents with the original extension.
    So webpack will output that imported image in the output path or folder.
    Now if you check the browser the src of image is wrong because ideally the name of the src attr must include 
    the <path to the image>/<name of image in md5 format> but we have just the name of the image.
    For handling this issue we must tell webpack where the output of our image is located.(in this case in dist folder.)
    So we have to add another property named publicPath. to output object in config where we specify the folder of our 
    outputs and don't forget the ending slash in publicPath.  
    If you look at the src attr for image in dev tools, you see that the src begins with the path to that image and then
    the name of the image.
    *publicPath tells webpack where all of the generated(outputted) files are located. 
    *If you deploy the code to website, you must change the publicPath 
     
    important: regex expressions shouldn't be in quotes!*/

    /* For importing css files into a JS file, we also need to teach webpack how to bundle these kind of files.So we add
    a new rule. The new rule tells webpack that every time it sees a css file, it needs to use css-loader and style-loader.
     in order to import that css file into js file. css-loader will read our CSS from that file and style-loader will
     create style tags inside our HTML page and put css into it. 

     REMEMBER: The order of loaders are important for each rule! Webpack process loaders from right to left.So in 
     sass rule, webpack will first invoke 'sass-loader' which will convert our .scss to .css file and then 'css-loader'
     which will take that converted .css and convert it to JS representation and only then webpack will create style tags
     inside our HTML page and put css into it. For install required loaders for sass we must install 'sass-loader' and 
     'node-sass' but we shouldn't include 'node-sass' into our loaders in config file.
     */ 

     /* We need to specify a couple of options for 'babel-loader'.For using options property in use array, we must convert
     use array to an object.As you can see in below.
     In babel, env oreset will help us to compile Ecma-script6 and above, down to Ecma-script5. Env preset includes all of 
     the features from the latest Ecma-script specification.
     Now: We know that class properties are not part of the official Ecmascript specification.So we need a babel plugin 
     named transform-class-properties. 
     Now we need to install @babel/core babel-loader @babel/preset-env babel-plugin-transform-class-properties --save-dev*/

     /* We want to reduce the size of bundle.js so we need to add a plugin to webpack.So we create a new section in config file
     called plugins.After that we are instanciate from TerserPlugin() so we need to import this plugin with the exact name 
     that we are instanciate from it (in this case, this name is TerserPlugin() so we have to import terser-plugin with the name :
     TerserPlugin) at the begginning of the file.

     Remember: All webpack plugins must be installed via --save-dev option to indicate that they are used as development dependancies.
     Webpack plugins are development dependancies because we need it only during the build (development) process.If we use --save option
     then it will consider as a production dependancy.Production dependancies are required when we publish our project to production servers.
     However we don't need webpack plugins on production servers. So they are dev dependancies.
      */

     /* How extract our css files into seprate files rather than bundle.js.If you don't do this, all of the css properties and
     classes and ... will go inside the <style> tag inside the HTML document and it would be pretty messy. Styles are dynamically
     added to DOM by JS during runtime. 
     By this approach our bundle.js file will become very big so we must extract all our css files into a separate file which
     will be generated alongside our JS bundle.js file.This way we have two bundle.js files instead of one.
     So by doing this new approach, we can load several files in parallel which making overall exprience better.So we must install
     MiniCssExtractPlugin. Now we can specify the name of that extracted css file.
     Now we need to modify our rules for CSS and SASS in order to use MiniCssExtractPlugin: For modifying css rule we need to 
     replace style-loader with MiniCssExtractPlugin.loader and the same for SASS rule. and also import this plugin at top of 
     our config file and at last install it via --save-dev
     Now run webpack and we will get new file with that filename we specify in () of new MiniCssExtractPlugin in 'dist/'
     folder.
     *Now like what we did for bundle.js, we need to include this new css file manually in our index.html file.
     Now we don't have any styles in our <style> tag and instead we have styles in an external file.
     */

     /* If a file didn't change between each reload, your browser can save it in a specific place(cache).But what if you
     a bug on your website and your JS files has been changed? If the browsers always take these files from cache , the
     viewers can't see the changes.So we need to update the cache.One solution is create new file with new name, each time
     you make a change.We know browsers remember files by their names, therefore if the name changes browsers will download
     the new versions. Webpack can do this automatically.One of the best practices is to add md5 hash to the name of
     the file and this md5 hash depends on contents of the file.So this way webpack will generate new filename only if 
     there are some changes inside.
     Imagine our CSS files had little change but JS files don't.In this case webpack will generate new name for css not
     for js.
     In order for this to work, we need to add [contenthash] to the output file name. 
     Now if you run webpack, we will have 2 js files, one the previous and one is bundle.sadadwer... .js

     How remove old bundeled files from the dist folder before generating new bundles.So we can use clean webpack plugin.
     Each time you run the build process this plugin will clear the output.path folder (remember output is an object 
     and path is a property in it.In our case that folder is dist.Cleaning means it removes all the files from dist 
     folder.This way webpack ensures that it has absolutely clean folder before putting anything else into it. )
     You can set things up so this plugin will clean out multiple files.We just need to pass in some options when 
     instantiating this plugin in plugins array.

     For installing CleanWebpackPlugin , you should install it as a dev dependency. So the option is --save-dev.
     By the way it's possible to clean multiple folders with CleanWebpackPlugin. You just need to provide a couple
     of options when instantiating this plugin in the plugins array. For example that additional folder is named build 
     and inside this folder we have file1.css and a subfolder with another css file.Let's config webpack to clean this 
     folder as well as the folder specified in output.path . So we must use cleanOnceBeforeBuildPatterns.

     In cleanOnceBeforeBuildPatterns you can specify an array of the file patterns which you want to remove before
     webpack generate new files. You can specify an array of file patterns whcih you want to remove those files.
     All patterns are realtive to the webpack output.path directory.

     Remember: The pattern we used in below in cleanOnceBeforeBuildPatterns (those *) means remove all the files together 
     with sub directories inside the dist folder, no matter how many nesting levels there are and this is what 
     cleanOnceBeforeBuildPatterns looks like by default.However if you want to remove files outside of dist folder,
     you should specify an absolute path for the file patterns.
     path.join(proces.cwd()), ... ,will remove all the files and folders together with subfolders inside the build folder. 
     Now after running build process, the build folder would be empty.This means webpack remoed all the files and 
     subdirectories from the build folder. 

     Reacp: So now each time we run build command, it's gonna clean the old bundled fiels in output.path folder and also all of 
     files and sub directories in build folder. Also you can add other folders to clean or delete some files or folders
     that you specified in them with this plugin.

     Important: We need to use {} when requiring 'clean-webpack-plugin'. 
    
     Generating html files automatically during build command:
     If we go to our .html file, we'll see that the references to our bundle files don't have the md5 hashes in the names of
     those bundled files. For example one path in index.html currently is: href="./dist/style.css" , so as you can see, this
     reference doesn't have md5 hash and also the reference for JS file. So we can copy the file names in our project and 
     paste them inside our HTML file and now the website is working. So this means that we need to change the name of the 
     css and js file in our html file MANUALLY AFTER EVERY build command. So for making our lives a bit easier,webpack has a 
     special plugin that updates the names of the files during each build command.This plugin is called: html-webpack-plugin
     and it can also creates the whole html file for us. So first add this plugin to the array of plugins in webpack config 
     file and also you must import that plugin with that exact name you used for creating an instance of that plugin in 
     plugins array. Now install it as dev dependency.
     Now if you run build command, we would have a new html file called index.html .But the formatting of this file is not
     so nice and also we have to adjust the path to our bundled files (which are inside dist folder, like this index.html file).
     Because the path to css and js files inside index.html is not correct and it's got a prefix which is dist/... .Since our
     index.html file is also located inside dist folder as the bundles themselves, we don't need this prefix anymore.
     Webpack generates this prefix according to the publicPath option. So we can change this pulicPath, we can change it from
     './dist' and we leave it empty because we don't need it to manipulate the path to bundled files in index.html . Now
     run build process again.
     Now we have to html files, one generated by webpack and located inside dist folder and one in the root of the project.
     So let's remove the html file that is in root of project because we don't need it anymore.So we will only use the html 
     file that is generated by webpack.
     
     How to customize some stuff inside the html file in dist folder (how cusomize html files that was generated by webpack):
     If you look at the generated html file, you notice that webpack changed the <title> element. So we want our original 
     title back,so we can pass additional options in () of where we're instantiating the html-webpack-plugin in plugins array.
     For example we can specify a custom title. Also we can specify the name of the generated file and provide additional meta
     tags and also we can specify a subfolder by specifying a series of slashes and name of that sub directory. In our code, the
     name of that subfolder is subfolder.
     In our code, description: 'some description' would creating a <meta name="description" content="some description">
     but webpack won't format it correctly. Other options are in github page of this plugin.
     By the way you can even provide your own template for the generated html file.This way you can fully customize how it
     looks. 

     Let's create our own template for generating html fiels:
     First we must decide which template engine we're going to use.
     Handlebars (template engines) allows us to separate business logic from persentation.
     Important: If you find yourself generating html inside your javascript code, you probably need some kind of template
     engine.We're gonna this template inside src folder. Now let's copy the html code from generated html file and paste it
     into this handlebar file.We also need to remove the references to bundled files from hbs file.So delete:
     <link href="../style..." rel="stylesheet">
     <script src="../bundle..."></script>
     
     Why we deleted these references? Because webpack will add these references automatically during build command and we know 
     that the names of generated files(bundled files-except html file, which we can specify the name of that) will be 
     different each time.Because we're using md5 hash in the bundled file name.

     You can put everything inside the hbs file. Webpack will use it as a template while generating the html file during the 
     build process.

     {{HtmlWebpackPlugin.options.description}} is a handlebar variable.We assign these varibales in the webpack config file.
     Now let's tell webpack to use our template while generating the html file.So go to plugins array and inise the object
     which is inside parentheses of new HtmlWebpackPlugin, add another option called template.
     Important: All of tbe variables that we use inside our hbs files, must be specified inside the webpack config file.

     Now since we're using a new type of file (.hbs), we need to teach webpack how handle this type of file. So go to
     modules then in rules array, add a new object (in rules array, we specify the types of file with their extensions 
     and in there we also specify the plugins that must be use for those types of files). For .hbs files we'll use a 
     new loader named handlebars-loader, so we must specify it in use array inside the object for handling .hbs files.
     Now let's install this loader as dev dependency. We also need to install handlebars package itself AND WE WOULD 
     INSTALL THIS PACKAGE AS A DEPENDENCY AND NOT dev-dependency. So npm i handlebars --save or without --save.
     Now run build process.
     Remember: For using html-webpack-plugin inside of .hbs file, you must use it with small h not capital h. So it
     would be htmlWebpackPlugin.options.<the name of option>

     After these, webpack would use our own .hbs template for generating the html files.
     Important: In the main handlebars file, or even main html file (index.html)-(we can specify the name of the main 
     .hbs file in template property which is in object of options inside () of new HtmlWebpackPlugin) , we don't need
     to write the reference to bundled css file or js file, webpack will automatically do that BUT if you do this 
     manually, there would be a duplicate in generated html file.
     
     Usually production builds require a different setup than development builds. In production build, we want our website
     to be as fast as possible and our bundled files should be as small as possible. Now how make our webpack configuration
     serve for both use cases.

     mode options enables certain buil-in optimizations for productions builds and development builds.In the beginning we 
     set this option to 'none'. Setting it to 'none' means we don't need any kind of buil-in optimizations.
     We can put 3 different values for this option: 'none', 'development' or 'production'.
    'production' mode enables a long list of plugins including terser plugin.

    The mode option also sets process.env.NODE_env variable to production. We can use this variable in our code(in any file
    of your js files) to check if we're in production mode or in development mode.
    Production and development modes, also handle errors differently.Now run build in terminal.
    Now if you have any error in code, you might see it in console of browser and because our js files are bundled inside
    one file and also minified, we just see this error comes somewhere from the bundled js file from line 1. So we can't 
    find out where is the error coming from? But if you change mode to 'development' and run build again, you can find out
    where is the error.This works because development mode uses source maps by default.

    So we should change the mode to production everytime we want to deploy the application. But this is not very convinient.
    We can manage effectively different configuration for production and development builds. For this task, we can create
    2 different configuration files: one for production builds and one for development builds. So we can rename the current 
    webpack file to webpack.production.config.js
    In production file for webpack we can safely remove terser plugin, because in production mode, this plugin is included by
    default.
    In webpack.dev.config.js we need to remove [contenthash] from file names of our css and js bundled files. Because we don't
    need to handle browser caching during development. We can also remove terser plugin from plugins array. Because we 
    don't need to minify our code during development. Also we don't need to extract all our css into a separate file as well.
    So remove: new miniCSSExtractPlugin from plugins array and also from require() section and also we need to replace this
    plugin with style-loader plugin for both rules for .css and .scss files in the reules array.

    Now we need to run these 2 configuration files separately. This can easily done in npm scripts. So we need to change,
    build: "webpack" to build: "webpack --config webpack.production.config.js" and also create one more script named "dev" 
    and it would be "dev": "webpack --config webpack.production.config.js"

    Important: These npm scripts and configs are suitable for single page applications.

    In development process:
    Ideally we want to see the changes in browser instantly even without rebuilding stuff. We need to install webpack-dev-server
    npm package as a dev dependency. Now we need to specify options for dev-server in webpack.dev. So add a new option called
    devServer to module.exports object. In the object for devServer we need to pass in 3 options. First one is contentBase and
    it must point to our dist folder as an absolute path.
    Third option would be the port on which this webpack-dev-server will be running.
    Now we need to change the npm script for development build, because it must use webpack-dev-server now. So now it would be
    "webpack-dev-server --config webpack.dev.config.js --hot"
    With this command everytime we change our code and save it, the browser will reload and we can see the changes instantly,
    withour running the dev script in terminal again.
    
    FIXME: dev npm script doesn't compile files into dist folder


 */


const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:'./src/index.js',

    output: {
        filename:'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },

    mode:'production',

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)$/,
                use: ['file-loader']
            },

            {
                test: /\.(css)$/,
                // use:['style-loader', 'css-loader']
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.(scss)$/,
                // use:['style-loader', 'css-loader', 'sass-loader']
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },

            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }
                }
            },

            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },

    plugins:[
        // new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                //default: '**/*'

                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            title: 'Hello world',
            filename: 'subfolder/custom_filename.html',
            meta: {
                description: 'some description'
            }
        })
    ]
};

