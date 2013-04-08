cilite
======

A build status light for use within a continious integration workflow.

It polls [Jenkins](http://jenkins-ci.org/) for the status of the last build and 
changes an rgb led light color:

    success   =>  green
    failed    =>  red
    building  =>  blue

**dependencies**:  
nodejs, an [Arduino](http://www.arduino.cc/) setup for [johnny-five](https://github.com/rwldrn/johnny-five#setup-and-assemble-arduino) goodness.

`npm install`  
`node main --url=JSON_API_URL_FOR_LAST_BUILD`  
`npm test` to test (expects a mounted Arduino board)  
`node server --url=JSON_API_URL_FOR_LAST_BUILD` to use a webpage "light" instead of an Arduino board

-------------

<img src="https://github.com/twalker/cilite/raw/master/public/img/cilite.jpg">

<img src="https://github.com/twalker/cilite/raw/master/public/img/cilite_bb.png">

