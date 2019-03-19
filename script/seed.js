'use strict'

const db = require('../server/db')
const {User, Problem, Test} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      githubId: 4343,
      lastName: 'Smith',
      codewars: 'codycodewars',
      stackoverflow: 'codystackoverflow',
      medium: 'codymedium',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'John',
      lastName: 'Jones',
      githubId: 23412,
      password: '123'
    })
  ])

  const problems = await Promise.all([
    Problem.create({
      problemSlug: 'backwards_array',
      problemName: 'Backwards Array',
      problemDescription:
        'Create an array which contains the values 1 through 10, backwards. Example: backwardsArray(4) returns [4,3,2,1]',
      problemFunctionCall: 'backwardsArray(10)',
      problemTemplate: 'const backwardsArray = (n) => {\n\n}',
      expectedResult: '[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]',
      solved: false
    }),
    Problem.create({
      problemSlug: 'count_vowels',
      problemName: 'Count Vowels',
      problemDescription:
        'Return the number of vowels that are within a string. Example: countVowels("Learning code is fun") returns 7',
      problemFunctionCall: 'countVowels("This Is Quik Code")',
      problemTemplate: 'const countVowels = (str) => {\n\n}',
      expectedResult: '6',
      solved: false
    }),
    Problem.create({
      problemSlug: 'is_palindrome',
      problemName: 'Is Palindrome',
      problemDescription:
        'Return true or false if the string is a Palindrome. Example: isPalindrome("dad") returns true',
      problemFunctionCall: 'isPalindrome("dad")',
      problemTemplate: 'const isPalindrome = (str) => {\n\n}',
      expectedResult: 'true',
      solved: false
    })
  ])

  const backwardsArrayTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = backwardsArray(3); chai.expect(value).to.equal([3,2,1])});",
      problemId: 1
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = backwardsArray(1); chai.expect(value).to.equal([1])});",
      problemId: 1
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = backwardsArray(8); chai.expect(value).to.equal([8,7,6,5,4,3,2,1])});",
      problemId: 1
    })
  ])

  const countVowelsTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = countVowels('aeiou'); chai.expect(value).to.equal(5",
      problemId: 2
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = countVowels('what'); chai.expect(value).to.equal(1)};",
      problemId: 2
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = countVowels('hello'); chai.expect(value).to.equal(2)};",
      problemId: 2
    })
  ])

  const isPalindromeTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = isPalindrome('straw warts'); chai.expect(value).to.equal(true)})",
      problemId: 3
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = isPalindrome('warts'); chai.expect(value).to.equal(false)})",
      problemId: 3
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = isPalindrome('a'); chai.expect(value).to.equal(true)})",
      problemId: 3
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
  console.log(`seeded ${backwardsArrayTest.length} backwardsArraytest `)
  console.log(`seeded ${countVowelsTest.length} countVowelsTest `)
  console.log(`seeded ${isPalindromeTest.length} isPalindromeTest`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
