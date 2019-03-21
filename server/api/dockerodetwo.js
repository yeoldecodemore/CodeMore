const router = require('express').Router()
const Dockerode = require('dockerode')
let dockerode = new Dockerode()

module.exports = router

router.post('/test', (req, res, next) => {
  const {code} = req.body
  function runExec(container) {
    var options = {
      Env: [`CODE=${code}`],
      Cmd: ['sh', 'script.sh'],
      AttachStdout: true,
      AttachStderr: true
    }

    container.exec(options, function(err, exec) {
      if (err) return
      exec.start(function(err, stream) {
        if (err) return
        const newStream = require('stream')
        const logStream = new newStream.PassThrough()
        logStream.on('data', function(chunk) {
          res.send(chunk)
        })

        container.logs(
          {
            follow: true,
            stdout: true,
            stderr: true
          },
          function(err, stream) {
            if (err) {
              console.error(err.message)
            }
            container.modem.demuxStream(stream, logStream, logStream)
            setTimeout(function() {
              stream.destroy()
            }, 2000)
          }
        )
      })
    })
  }

  dockerode
    .createContainer({
      Image: 'rootdocker',
      Tty: true,
      Cmd: ['sh', 'script.sh'],
      StopTimeout: 10
    })
    .then(function(container) {
      return container.start()
    })
    .then(async function(container) {
      runExec(container)
    })
    .catch(function(err) {
      console.log(err)
    })
})

// dockerode.createContainer(
//     {
//         Image: 'rootdocker',
//         Tty: true,
//         Cmd: [ 'sh', 'script.sh' ]
//     },
//     function(err, container) {
//         container.start({}, function(err, data) {
//             runExec(container);
//         });

//         // container.remove();
//     }
// );
