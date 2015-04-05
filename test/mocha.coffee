chai = require("chai")
chai.should()

global.assert = chai.assert
global.expect = chai.expect

global.sg = require('../index.js')
