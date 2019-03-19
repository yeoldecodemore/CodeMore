const router = require('express').Router()
const {exec} = require('child_process')
const {Test} = require('../db/models/test')

module.exports = router

const concatCode = (testspec, userCode) => {
  const chai = "const chai = require('chai');"
  return chai.concat(userCode, testspec)
}

router.post('/:problem', async (req, res, next) => {
  try {
    const {code, id, problemId} = req.body
    const problem = req.params.problem
    const allTests = await Test.findAll({
      where: {
        problemId
      }
    })

    if (allTests.length) {
      const fullCode = concatCode(code, allTests)
      exec(
        `docker run --name ${id} -d --stop-timeout 5 --rm -e CODE="${fullCode}" rootdocker && docker logs -f ${id}`,
        (err, stdout, stderr) => {
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
