const router = require('express').Router()
const {Test} = require('../db/models')
const axios = require('axios')

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
      const {data} = await axios.post(
        'https://codemore-docker.herokuapp.com/testing',
        {code: `${script}`}
      )
      res.send(data)
    } else {
      throw new Error('that problem does not exist')
    }
  } catch (error) {
    next(error)
  }
})
