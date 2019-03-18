const router = require('express').Router()
const {exec} = require('child_process')
const {testCase} = require('./testcases')

module.exports = router

const concatCode = (testspec, userCode) => {
  const chai = "const chai = require('chai');"
  return chai.concat(userCode, testspec)
}

router.post('/:problem', (req, res, next) => {
  try {
    const problem = req.params.problem
    if (testCase[problem]) {
      const test = testCase[problem]
      const {code} = req.body
      const fullCode = concatCode(test, code)
      console.log(fullCode)
      exec(
        `docker run --stop-timeout 5 --rm -e CODE="${fullCode}" rootdocker`,
        (err, stdout, stderr) => {
          if (err) {
            throw err
          } else {
            res.send(stdout || stderr)
          }
        }
      )
    } else {
      throw new Error('that problem does not exist')
    }
  } catch (error) {
    console.log(error)
  }
})
