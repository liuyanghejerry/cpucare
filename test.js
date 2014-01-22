var CpuCare = require('./cpucare.js');
var cluster = require('cluster');

if (cluster.isMaster) {
  var child = cluster.fork();
  console.log('child pid:', child.process.pid);
  console.log('master pid:', process.pid);
  var c = new CpuCare({
    target: child.process.pid,
    mark: 90,
    cycle: 3*1000
  });
  c.once('processkilled', function(info) {
    console.log('child is killed', info);
    console.log('TEST OK');
    process.exit(0);
  });
  // in case process is not get killed, we have to kill it
  setTimeout(function() {
    if (child.process) {
      console.log('ERROR: something is wrong within cpucare!',
        ' You may need to terminate process', child.process.pid,
        'yourself.');
      child.kill();
    }
  }, 6*1000);
} else {
  while (true) {
    var aaaa = 1+2+3;
  }
}
