This is a sample ReactJS application that uses ES6 with the Babel transpiler.
The web server is Express, and is OpenShift-ready, however...

When trying to bundle the application with "jspm bundle-sfx public/server/web/index app.js" there is an error:

=> jspm bundle-sfx public/server/web/index app.js

     Building the single-file sfx bundle for public/server/web/index...

err  Error on fetch for babel-core/register.js at file:///Users/sellis/projects/javascript/sample-es6-jspm-react-app/babel-core/register.js
	Loading public/server/web/index.js
	Error: ENOENT: no such file or directory, open '/Users/sellis/projects/javascript/sample-es6-jspm-react-app/babel-core/register.js'
         at Error (native)

The application works perfectly when run normally, but the bundler fails.

Build:
npm install

Run:
npm start






