cilite
======

An [Arduino](http://www.arduino.cc/) build status light for use in with continious integration.

It polls [Jenkins](http://jenkins-ci.org/) for the status of the last build and 
changes an rgb led light color:

    success   =>  green
    failed    =>  red
    building  =>  blue

`npm test` to test  
`npm start` to run with defaults  
`node main --url=JSON_STATUS_URL` to use arguments  
`node server --url=JSON_STATUS_URL` to use a webpage "light" instead of an Arduino board

-------------
<img src="https://github.com/twalker/cilite/raw/master/public/img/cilite.jpg">
