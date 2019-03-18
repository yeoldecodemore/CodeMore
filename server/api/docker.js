const router = require('express').Router()
const {exec} = require('child_process')
const {testCase} = require('./testcases')

module.exports = router

router.post('/:problem', (req, res, next) => {
  try {
    const problem = req.params.problem
    if (testCase[problem]) {
      const solutionTest = testCase[problem]
      const {code} = req.body
      const fullCode = code.concat(solutionTest)
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
