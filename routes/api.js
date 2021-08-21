const apiRouter = require("express").Router();

const School = require('school-kr')
const school = new School()

school.init(School.Type.HIGH, School.Region.GYEONGGI, 'J100005286')


apiRouter.get('/keyboard', function(req, res) {
   const data = {'type' : 'text'}
   res.json(data);  
});

apiRouter.post('/meal', async function(req, res) {
   const dateInfo = req.body.userRequest.utterance; 
   
   const meal = await school.getMeal({default: '이 날은 급식이 없습니다.'});
   const printing = meal[dateInfo]
   console.log(req.body);
   
   const responseBody = {
     version: "2.0",
     template: {
       outputs: [
         {
           simpleText: {
             text: `${meal.month}월 ${dateInfo}일 급식정보 \n` + printing
           }
         }
       ]
     }
   };
   res.status(200).send(responseBody);
 });
 
 apiRouter.post('/monthlymeal', async function(req,res) {
   const datetime = req.body.action.params;
   const pre_result = datetime.get("datetime");
   const monthlymeal_result = pre_result.substring(18,20);

   const meal2 = await school.getMeal({default: '이 날은 급식이 없습니다.'});
   const monthly_printing = meal[monthlymeal_result];
   console.log(req.body);

   const responseBody = {
     version: "2.0",
     template: {
       outputs: {
         simpleText: {
           text: `${meal2.month}월 ${monthlymeal_result}일 급식정보 \n` + monthly_printing
         }
       }
     }
   };
   res.status(200).send(responseBody)
 });


module.exports = apiRouter;

