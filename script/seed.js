'use strict'

const db = require('../server/db')
const {User, Problem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
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
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
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
