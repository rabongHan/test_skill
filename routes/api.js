const apiRouter = require("express").Router();

const School = require('school-kr')
const school = new School()

school.init(School.Type.HIGH, School.Region.GYEONGGI, 'J100005286')
// const example = async function() {
//   const meal = await school.getMeal();
//   return(meal)
// }



apiRouter.post('/meal', async function(req, res) {
  //  const result = await example();
   const meal = await school.getMeal();
   const printing = meal[24]
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

