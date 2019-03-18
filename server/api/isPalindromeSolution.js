function isPalindrome(string) {
  if (string.length <= 1) {
    return true
  } else if (
    string[0].toLowerCase() === string[string.length - 1].toLowerCase()
  ) {
    return isPalindrome(string.slice(1, string.length - 1))
  } else {
    return false
  }
}
isPalindrome('mom')

const {expect} = require('chai')

describe('isPalindrome', () => {
  it('is a function', () => {
    expect(isPalindrome).to.be.a('function')
  })

  it('returns a boolean', () => {
    let returnedValue = isPalindrome('definitely not')
    expect(returnedValue).to.be.a('boolean')
  })

  it('returns true if the passed string is a palindrome', () => {
    let returnedValue = isPalindrome('straw warts')
    expect(returnedValue).to.equal(true)
  })

  it('returns false if the passed string is not palindrome', () => {
    let returnedValue = isPalindrome('this is not a palindrome')
    expect(returnedValue).to.equal(false)
  })

  it('ignores differences in case', () => {
    let returnedValue = isPalindrome('UFOtofu')
    expect(returnedValue).to.equal(true)
  })
})
