cpucare is a monitor tool that autmatically sends signal(usually SIGTERM) to process where cpu usage is too high.

### Usgae

~~~js

var cpucare = require('cpucaure');

var target_process = 0; // should be your target process
var c = new CpuCare({
  target: target_process,
  mark: 90, // sends signal only when cpu usage is higher than 90
  cycle: 30*1000, // checks per 30 sec
  signal: 'SIGTERM' // defaults to SIGTERM
});

// you should get and only get one processkilled event when target process is killed
c.once('processkilled', function(info) {
  console.log('target_process is killed', info);
});


~~~

What you may get:

~~~js
target_process pid: 11394
master pid: 11392
target_process is killed { cpu: 93.2,
  memory: 14553088,
  mark: 90,
  signal: 'SIGTERM',
  cycle: 30000,
  pid: 11394 }

~~~

### LICENSE

BSD-2