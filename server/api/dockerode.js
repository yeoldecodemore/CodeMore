const router = require('express').Router()
var Dockerode = require('dockerode')
let dockerode = new Dockerode()

module.exports = router

const buildDockerImg = async () => {
  let stream = await dockerode.buildImage(
    {
      context: __dirname,
      src: ['Dockerfile', 'script.sh']
    },
    {t: 'rootdocker'}
  )
  await new Promise((resolve, reject) => {
    dockerode.modem.followProgress(
      stream,
      (err, res) => (err ? reject(err) : resolve(res))
    )
    console.log('created docker image')
  })
}
buildDockerImg()

function runExec(container) {
  var options = {
    Env: [`CODE="console.log('hello')"`],
    AttachStdout: true,
    AttachStderr: true
  }

  container.exec(options, function(err, exec) {
    console.log('in')
    console.log('err', err)
    if (err) return
    exec.start(function(err, stream) {
      if (err) return

      container.modem.demuxStream(stream, process.stdout, process.stderr)

      console.log(process.stdout)

      exec.inspect(function(err, data) {
        console.log('info from inspect:', data)
        if (err) return
      })
    })
  })
}

router.post('/test', async (req, res, next) => {
  try {
    dockerode.createContainer(
      {
        Image: 'rootdocker',
        Tty: true
      }
      // function(err, container) {
      //   container.start({}, function(err, data) {
      //     runExec(container)
      //   })
      // }
    )
    res.send('******')
  } catch (err) {
    console.error(err)
  }
})
