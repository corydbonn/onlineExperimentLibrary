# Online Experiment Library

This repository contains code for running experiments online based on HTML/CSS/Javascript and tools for leveraging the AngularJS framework. Though originally designed for running experiments for use with Amazon Mechanical Turk, the software in no way depends on any of their data collection mechanisms. This will be the repository for the continually updated library I use to run my online experiments in hopes that it will be of use to others. Stay tuned for completion as I streamline and prepare my code for public consumption.

I have built these files without a particular database in mind, but find that [firebase](https://firebase.com) makes life incredibly easy. No fuss with other programming languages like PHP or having to learn database software like MySQL with its associated wrappers. Just save your data files in their original JSON format to the database in 3 lines of code! And coupled with the 'rjson' library for reading these files in R (examples in these libraries to come), data analysis is fairly easy to streamline. For storage of static files, use your own server or a handy cloud server such as Amazon S3.

Currently the library depends heavily on the [fabric.js](http://fabricjs.com), though I have plans to develop alternatives using [D3](http://d3js.org) in the future. To extend these libraries, I recommend visiting [this javascript library database](http://www.javascripting.com).


