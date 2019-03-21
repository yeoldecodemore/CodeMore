const router = require('express').Router()
const {exec} = require('child_process')
const {Test} = require('../db/models')
var Docker = require('dockerode')
var docker = new Docker()

module.exports = router

const concatCode = (testspecs, userCode) => {
  const chai = "const chai = require('chai');"
  const tests = testspecs.reduce((acc, curr) => {
    acc += `${curr.testTemplate};`
    return acc
  }, '')
  return chai.concat(userCode, tests)
}

router.post('/:problem', async (req, res, next) => {
  try {
    const {code, problemId, id} = req.body

    const allTests = await Test.findAll({
      where: {
        problemId
      }
    })

    if (allTests.length) {
      const script = concatCode(allTests, code)
      exec(
        `docker run --name ${id} -d --stop-timeout 5 --rm -e CODE="${script}" rootdocker && docker logs -f ${id}`,
        (err, stdout, stderr) => {
          console.log('*****', stdout, '&&&&&&', stderr, '@@@@@@@', err)
          res.send(stdout || stderr || err)
        }
      )
    } else {
      throw new Error('that problem does not exist')
    }
  } catch (error) {
    next(error)
  }
})
