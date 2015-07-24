# Online Experiment Library

This repository will contain code for running experiments online based on HTML/CSS/Javascript and tools for leveraging the AngularJS framework. Though originally designed for running experiments for use with Amazon Mechanical Turk, the software in no way depends on any of their data collection mechanisms. This will be the repository for the continually updated library I use to run my online experiments in hopes that it will be of use to others. Stay tuned for completion as I streamline and prepare my code for public consumption.

I've found that even with the increasing availability of resources for running online experiments, notably [psiturk](http://psiturk.org) and [jspsych](http://www.jspsych.org), there's still potential for making creative stimulus generation and custom response types (eg. continuous sound synthesis, mouse tracking) in the browser much easier.

I have composed these files without a particular database in mind, but find that [firebase](https://firebase.com) makes life incredibly easy. No fuss with other programming languages like PHP or having to learn database software like MySQL with its associated wrappers. Just save your data files in their original JSON format to the database in 3 lines of code! And coupled with the 'rjson' library for reading these files in R (examples in these libraries to come), data analysis is fairly easy to streamline. For storage of static files, I suggest using a handy cloud storage service such as Amazon S3.

Currently the library depends heavily on the [fabric.js](http://fabricjs.com) library, though I have plans to develop alternatives using [D3](http://d3js.org) in the future. To extend these libraries, I recommend visiting [this javascript library database](http://www.javascripting.com).

Finally, a DISCLAIMER: I'm not a software engineer, but I've tried to maintain the good coding practices I know about with respect to web programming and, whenever possible, provide means of efficiently creating and rendering stimuli. Ultimately, we experimenters have very little control over what people are doing in their browsers, so fine timing, monitor specs, mouse and trackpad specs, key-response speed, and sound hardware are out of our control. I've tried to make readable code. if you would like to contribute or suggest improvements, feel free. But my primary purpose is to get research done, so I cannot promise anything.


