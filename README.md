
Had some trouble 

1 - rhc ssh proyect-name
2 - cd nodejs
3 - npm install bower
4 - cd ..
5 - export HOME=$HOME/app-root/runtime/repo
6 - cd app-root/repo
7 - bower install

git remote add openshift -f ssh://56620ad37628e1dd790000f4@belliesbanglesapp-jsellis.rhcloud.com/~/git/belliesbanglesapp.git/
git merge openshift/master -s recursive -X ours
git push openshift HEAD

# sample-es6-jspm-react-app
