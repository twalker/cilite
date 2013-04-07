cilite
======

An [Arduino](http://www.arduino.cc/) build status light for use within a continious integration workflow.

It polls [Jenkins](http://jenkins-ci.org/) for the status of the last build and 
changes an rgb led light color:

    success   =>  green
    failed    =>  red
    building  =>  blue

`node main --url=JSON_STATUS_URL`  
`npm test` to test (expects mounted board)  
`node server --url=JSON_STATUS_URL` to use a webpage "light" instead of an Arduino board

-------------
<img src="https://github.com/twalker/cilite/raw/master/public/img/cilite.jpg">

<img src="https://github.com/twalker/cilite/raw/master/public/img/cilite_bb.png">
