const router = require('express').Router()
const {NodeVM} = require('vm2')
module.exports = router

router.post('/', (req, res, next) => {
  console.log(req.body.code)
  res.send('okay!')
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
