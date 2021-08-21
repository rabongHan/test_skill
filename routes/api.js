const apiRouter = require("express").Router();

const School = require('school-kr')
const school = new School()

school.init(School.Type.HIGH, School.Region.GYEONGGI, 'J100005286')
// const example = async function() {
//   const meal = await school.getMeal();
//   return(meal)
// }

apiRouter.get('/keyboard', function(req, res) {
   const data = {'type' : 'text'}
   res.json(data);  
});

apiRouter.post('/meal', async function(req, res) {
   //  const result = await example();
   const dateInfo = req.body.userRequest.utterance; 
   const dateSecond = dateInfo.substring(9,11);

   const meal = await school.getMeal({default: '이 날은 급식이 없습니다.'});
   const printing = meal[dateSecond]
   console.log(req.body);
   
   const responseBody = {
     version: "2.0",
     template: {
       outputs: [
         {
           simpleText: {
             text: `${meal.month}월 ${dateSecond}일 급식정보 \n` + printing
           }
         }
       ]
     }
   };

   res.status(200).send(responseBody);
 });
module.exports = apiRouter;

