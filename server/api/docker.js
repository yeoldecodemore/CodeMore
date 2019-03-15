const router = require('express').Router()
const {NodeVM} = require('vm2')
const {exec} = require('child_process')

module.exports = router

router.post('/', (req, res, next) => {
  console.log(req.body.code)
  exec(
    `docker run --stop-timeout 5 --rm -e CODE="${req.body.code}" test1`,
    (err, stdout, stderr) => {
      console.log('err', err, '\n\n\nstdout', stdout, '\n\n\nstderr', stderr)
      res.send(stdout)
    }
  )
})

// router.get('/', async (req, res, next) => {
// 	try {
// 		const { code } = req.body;
// 		const vm = new NodeVM({
// 			require: {
// 				timeout: 1000,
// 				external: true,
// 				mock: {
// 					fs: {
// 						readFileSync() {
// 							return 'Nice try!';
// 						}
// 					}
// 				}
// 			}
// 		});

// 		const answerOne = vm.run(`${code} module.exports =isPalindrome("mom")`);
// 		const answerTwo = vm.run(`${code} module.exports =isPalindrome("ew")`);
// 		const obj = {
// 			answerOne: answerOne,
// 			answerTwo: answerTwo
// 		};
// 		res.json(obj);
// 	} catch (error) {
// 		next(error);
// 	}
// });
