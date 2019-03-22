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
    }),
    Problem.create({
      problemSlug: 'alphabet_position',
      problemName: 'Alphabet Position',
      problemDescription:
        'Given a string, replace every letter with its position in the alphabet. If anything in the text is not a letter, ignore it and do not return it. Example: alphabetPosition("The sunset sets at twelve") returns "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5"',
      problemFunctionCall: 'alphabetPosition("The sunset sets at twelve")',
      problemTemplate: 'const alphabetPosition = (str) => {\n\n}',
      expectedResult: '20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5',
      solved: false
    }),
    Problem.create({
      problemSlug: 'two_number_sum',
      problemName: 'Two Number Sum',
      problemDescription:
        'Write a function that takes a non-empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum to the target sum, the function should return them in an array in sorted order. Example twoNumberSum([4,6], 10) returns [4,6]',
      problemFunctionCall: 'twoNumberSum([4,6],10)',
      problemTemplate: 'const twoNumberSum = (str) => {\n\n}',
      expectedResult: '[4,6]',
      solved: false
    }),
    Problem.create({
      problemSlug: 'max_subset_sum_no_adjacent',
      problemName: 'Max Subset Sum No Adjacent',
      problemDescription:
        'Write a function that takes in an array of positive integers and returns an integer representing the maximum sum of non-adjacent elements in the array. If a sum cannot be generated, the function should return 0. Example maxSubsetSumNoAdjacent([1,15,3]) returns 15',
      problemFunctionCall: 'maxSubsetSumNoAdjacent([1,15,3])',
      problemTemplate: 'const maxSubsetSumNoAdjacent = (str) => {\n\n}',
      expectedResult: '15',
      solved: false
    }),
    Problem.create({
      problemSlug: 'min_number_of_jumps',
      problemName: 'Minimum Number of Jumps',
      problemDescription:
        'Given a non-empty array of integers with each element representing the maximum number of steps you can take forward, write a function that returns the minimum number of jumps needed to reach the final index. Example minNumberOfJumps([2,1,2,2,1,1,1]) returns 4',
      problemFunctionCall: 'minNumberOfJumps([2,1,2,2,1,1,1])',
      problemTemplate: 'const minNumberOfJumps = (str) => {\n\n}',
      expectedResult: '4',
      solved: false
    }),
    Problem.create({
      problemSlug: 'water_area',
      problemName: 'Water Area',
      problemDescription:
        'You are given an array of integers. Each non-zero integer represents the height of a pillar with width 1. Imagine water being poured over all of the pillars and return the surface area of the water trapped between the pillars viewed from the front. Spilled water should be ignored. Example waterArea([0,8,0,0,5,0,0,10,0,0,1,1,0,3]) returns 48',
      problemFunctionCall: 'waterArea([0,8,0,0,5,0,0,10,0,0,1,1,0,3])',
      problemTemplate: 'const waterArea= (str) => {\n\n}',
      expectedResult: '48',
      solved: false
    }),
    Problem.create({
      problemSlug: 'nth_fibonacci',
      problemName: 'Nth Fibonacci',
      problemDescription:
        ' Write a function that takes an integer n and returns the nth Fibonacci number. Example nthFib(6) returns 5',
      problemFunctionCall: 'nthFib(6)',
      problemTemplate: 'const nthFib = (str) => {\n\n}',
      expectedResult: '5',
      solved: false
    }),
    Problem.create({
      problemSlug: 'heap_sort',
      problemName: 'Heap Sort',
      problemDescription:
        'Write a function that takes in an array of integers and returns a sorted version of that array. Use Heap Sort algorithm to sort the array',
      problemFunctionCall: 'heapSort([8,5,2,9,5,6,3])',
      problemTemplate: 'const heapSort = (str) => {\n\n}',
      expectedResult: '[2,3,5,5,6,8,9]',
      solved: false
    })
  ])

  const backwardsArrayTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = backwardsArray(3); chai.expect(value).to.eql([3,2,1])});",
      problemId: 1
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = backwardsArray(1); chai.expect(value).to.eql([1])});",
      problemId: 1
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = backwardsArray(8); chai.expect(value).to.eql([8,7,6,5,4,3,2,1])});",
      problemId: 1
    })
  ])

  const countVowelsTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = countVowels('aeiou'); chai.expect(value).to.equal(5)};",
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

  const alphabetPositionTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = alphabetPosition('abc'); chai.expect(value).to.equal('1 2 3')})",
      problemId: 4
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = alphabetPosition('The sunset sets at twelve'); chai.expect(value).to.equal('20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5')})",
      problemId: 4
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = alphabetPosition('The narwhal bacons at midnight'); chai.expect(value).to.equal( '20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20'))})",
      problemId: 4
    })
  ])

  const twoNumberSumTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = twoNumberSum([4,6],10); chai.expect(value).to.eql([4,6])})",
      problemId: 5
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = twoNumberSum([4,6,1,-3],3); chai.expect(value).to.eql([-3,6])})",
      problemId: 5
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = twoNumberSum([1,2,3,4,5,6,7,8,9],17); chai.expect(value).to.eql([8,9])})",
      problemId: 5
    })
  ])

  const maxSubsetSumNoAdjacentTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = maxSubsetSumNoAdjacent([1,15,3]); chai.expect(value).to.equal(15)})",
      problemId: 6
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = maxSubsetSumNoAdjacent([7,10,12,7,9,14]); chai.expect(value).to.equal(33)})",
      problemId: 6
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = maxSubsetSumNoAdjacent([30,25,50,55,100,120]); chai.expect(value).to.equal(205)})",
      problemId: 6
    })
  ])

  const minNumberOfJumpsTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = minNumberOfJumps([1,1,1]); chai.expect(value).to.equal(2)})",
      problemId: 7
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = minNumberOfJumps([2,1,2,3,1,1,1]); chai.expect(value).to.equal(3)})",
      problemId: 7
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = minNumberOfJumps([3,4,2,1,2,3,7,1,1,1,3,2,3,2,1,1,1,1]); chai.expect(value).to.equal(7)})",
      problemId: 7
    })
  ])

  const waterAreaTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = waterArea([0,1,0,1,0,2,0,3]); chai.expect(value).to.equal(4)})",
      problemId: 8
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = waterArea([0,100,0,0,10,1,1,10,1,0,1,1,0,100]); chai.expect(value).to.equal(1075)})",
      problemId: 8
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = waterArea([0,1,0,0,0]); chai.expect(value).to.equal(0)})",
      problemId: 8
    })
  ])

  const nthFibTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = nthFib(1); chai.expect(value).to.equal(0)})",
      problemId: 9
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = nthFib(5); chai.expect(value).to.equal(3)})",
      problemId: 9
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = nthFib(6); chai.expect(value).to.equal(5)})",
      problemId: 9
    })
  ])

  const heapSortTest = await Promise.all([
    Test.create({
      testCaseNumber: 1,
      testTemplate:
        "it('test1', function(){let value = heapSort([1,2]); chai.expect(value).to.eql([1,2])})",
      problemId: 10
    }),
    Test.create({
      testCaseNumber: 2,
      testTemplate:
        "it('test2', function(){let value = heapSort([3,1,2]); chai.expect(value).to.eql([1,2,3])})",
      problemId: 10
    }),
    Test.create({
      testCaseNumber: 3,
      testTemplate:
        "it('test3', function(){let value = heapSort([-7, 2 , 3, 5, 4, -10]); chai.expect(value).to.eql([-10, -7, 2, 3, 4, 5])})",
      problemId: 10
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
  console.log(`seeded ${backwardsArrayTest.length} backwardsArraytest `)
  console.log(`seeded ${countVowelsTest.length} countVowelsTest `)
  console.log(`seeded ${isPalindromeTest.length} isPalindromeTest`)
  console.log(`seeded ${alphabetPositionTest.length} alphabetPositionTest`)
  console.log(`seeded ${twoNumberSumTest.length} twoNumberSumTest`)
  console.log(
    `seeded ${maxSubsetSumNoAdjacentTest.length} maxSubSetSumNoAdjacentTest`
  )
  console.log(`seeded ${minNumberOfJumpsTest.length} minNumberOfJumpsTest`)
  console.log(`seeded ${waterAreaTest.length} waterAreaTest`)
  console.log(`seeded ${nthFibTest.length} nthFibTest`)
  console.log(`seeded ${heapSortTest.length} heapSortTest`)
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
