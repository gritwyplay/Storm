import test from 'tape-promise/tape'

import Runner from '../index'
import Reporter from '../reporters/tdd'

import testCase from '../../tests/dummy/repeat-5'

const reporter = Reporter()

test('Repeat 5 - defined as function', assert => {
  Runner(testCase, reporter).then(() => {
    const results = reporter.results

    let actual
    let expected

    let min = 2
    let max = 4

    let testRepeats = (actual = results.filter(item => {
      return (
        item.action === 'log' &&
        item.arguments.length &&
        typeof item.arguments[0] === 'string' &&
        item.arguments[0].includes('Dummy - Repeat - 5')
      )
    }).length)

    assert.ok(
      actual >= min && actual <= max,
      'should have between 2 and 4 executions of the testcase `Dummy - Repeat - 5` (actual - ' +
        testRepeats +
        ')'
    )

    min = 2 * testRepeats
    max = 6 * testRepeats

    let stepRepeats = (actual = results.filter(item => {
      return (
        item.action === 'log' &&
        item.arguments.length &&
        typeof item.arguments[0] === 'string' &&
        item.arguments[0].includes(
          'Just a basic test step that should run a random amount of times'
        )
      )
    }).length)

    assert.skip(
      // actual >= min && actual <= max,
      'TODO: should have between 2 and 6 executions per test repeat (' +
        testRepeats +
        ') of the step `Just a basic test step that should run a random amount of times` (actual - ' +
        stepRepeats +
        ')'
    )

    // test should be a success
    expected = true
    actual = results.map(item => item.action).indexOf('success') > -1
    assert.equal(actual, expected, 'should be successfull')

    // runner should finish
    expected = true
    actual = results.map(item => item.action).indexOf('finished') > -1
    assert.equal(actual, expected, 'should finish until the end')

    assert.end()
  })
})
