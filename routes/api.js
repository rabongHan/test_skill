const apiRouter = require("express").Router();

const School = require('school-kr')
const school = new School()

school.init(School.Type.HIGH, School.Region.GYEONGGI, 'J100005286')
// const example = async function() {
//   const meal = await school.getMeal();
//   return(meal)
// }

apiRouter.get('/input', function(req, res) {
   const data = {'type' : 'text'}
   res.json(data);  
});

apiRouter.post('/meal', async function(req, res) {
   //  const result = await example();
   console.log("맛있는 식사 되세요!")
   const dateInfo = req.body.userRequest.utterance; 

   const meal = await school.getMeal();
   const printing = meal[dateInfo]
   console.log(req.body);
   
   const responseBody = {
     version: "2.0",
     template: {
       outputs: [
         {
           simpleText: {
             text: printing
           }
         }
       ]
     }
   };

   res.status(200).send(responseBody);
 });
module.exports = apiRouter;

