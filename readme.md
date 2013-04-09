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

Image of [Jenkins CI](http://jenkins-ci.org/) logo used without explicit permissions.
Not sure if this protrayal of the logo constitutes as a "Remix" under v3 the Creative commons license. 
Whatever, if Jenkins get's mad, I'll remove it. But Jenkins looks like an awfully pleasant fellow.

<img src="https://github.com/twalker/cilite/raw/master/public/img/cilite_bb.png">

-------------

Copyright (c) 2013 Tim Walker Licensed under the MIT license.
