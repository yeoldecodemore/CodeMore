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

router.post('/test', async (req, res, next) => {
  try {
    const {code} = req.body
    const createOptions = {
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Env: [`CODE=${code}`],
      StopTimeout: 3
    }
    dockerode.run(
      'rootdocker',
      ['sh', 'script.sh'],
      process.stdout,
      createOptions,
      function(err, data, container) {
        container.logs(
          {
            follow: true,
            stdout: true,
            stderr: true
          },
          function() {
            console.log(err)
            res.send(process.stdout)
          }
        )

        container.remove()
      }
    )
  } catch (err) {
    console.error(err)
  }
})
