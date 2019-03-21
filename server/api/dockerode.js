const router = require('express').Router()
const Dockerode = require('dockerode')
let dockerode = new Dockerode()
const stream = require('stream')

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

router.post('/test', async (req, res, next) => {
  try {
    const {code} = req.body
    const createOptions = {
      Env: [`CODE=${code}`],
      StopTimeout: 3
    }
    dockerode.run(
      'rootdocker',
      ['sh', 'script.sh'],
      process.stdout,
      createOptions,
      function(err, data, container) {
        if (err) console.log(err)
        const logStream = new stream.PassThrough()
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
      }
    )
  } catch (err) {
    console.error(err)
  }
})
