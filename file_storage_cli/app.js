var fs = require('fs'),
  path = require('path'),
  args = process.argv.splice(2),  // 去掉 node app.js,仅保留参数
  command = args.shift(),   // 取出第一个命令参数
  taskDescription = args.join(' '),  // 合并剩余参数
  file = path.join(process.cwd(), '/.tasks');

switch (command) {
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTask(file, taskDescription);
    break;
  default:
    console.log('Usage: ' + process.argv[0] + ' list | add [taskDescription]');
}


function loadOrInitializeTaskArray(file, cb) {
  fs.exists(file, exists => {
    var tasks = [];
    if (exists) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        var data = data.toString();
        var tasks = JSON.parse(data || '[]');
        cb(tasks);
      });
    } else {
      cb([]);
    }
  });
}

function listTasks(file) {
  loadOrInitializeTaskArray(file, tasks => {
    for (let i in tasks) {
      console.log(tasks[i]);
    }
  });
}

function storeTasks (file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', err => {
    if (err) throw err;
    console.log('Saved');
  });
}

function addTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, tasks => {
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  });
}
