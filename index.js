
// 1
// Skaffa dig en API-key för ninja-aPI:n
// https://api-ninjas.com/
// Det är gratis och man får nyckeln direkt.
const options = {
    method: 'GET',
    headers: {
       "Content-type": "application/json; charset=UTF-8",
       'X-Api-Key': 'XT7eSlzj4cmVKtXe1VCc9w==DY3xgMNPzqRG9E2R' // <= där ska din nyckel gå
    },
 };


// 2
// Fetcha information om vädret i Madrid och logga den.
// Lös det på alla tre olika sätt:
// Chainade promises (flera .then efter varandra)
// Async - Await (async function)

const c1 = "madrid";
const c2 = "istanbul";

const wheatherApiMadrid = new Request (`https://api.api-ninjas.com/v1/weather?city=${c1}`, options);
const wheatherApiIstanbul = new Request (`https://api.api-ninjas.com/v1/weather?city=${c2}`, options);

//Första sättet
   fetch(wheatherApiMadrid)
      .then(response => response.json())
      .then(data => {
         console.log(data);

        return fetch(wheatherApiIstanbul);
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));



//Andra sättet 
   const arrayOfResponsePromises = [fetch(wheatherApiMadrid), fetch(wheatherApiIstanbul)];

   const onePromiseForAllResponses = Promise.all(arrayOfResponsePromises);
   
   onePromiseForAllResponses.then(arrayOfResponses => {

      let arrayOfDataPromises = arrayOfResponses.map(response => response.json());

      const onePromiseForAllData = Promise.all(arrayOfDataPromises);
      onePromiseForAllData.then(arrayOfData => {
         console.log(arrayOfData);
      })
   })

   //Kortare
   Promise.all([fetch(wheatherApiMadrid), fetch(wheatherApiIstanbul)])
   .then(arrayOfResponses => {
      return Promise.all(arrayOfResponses.map(response => response.json()));
   })
   .then(arrayOfData => console.log(arrayOfData));

//Tredje sättet
   async function getCityInfo (city){
      const rqst = new Request (`https://api.api-ninjas.com/v1/weather?city=`+ city, options);
      const response = await fetch(rqst);
      const data = await response.json();
      return data;
   }

   getCityInfo("stockholm")
   .then(argument => console.log(argument))
   .catch(error => console.log(error));

// 3
// Cars-delen i Ninja-API är inte super bra, men vi kan göra lite saker med den.
// Hämta 30 bilar av märket Toyota från året 2010. Om du kollar på datan så ser du att 
// det finns en del repetitioner. Du ska logga alla modeller men utan att repetera dem.
// Lös det med chainade promises och med async function.

let toyotaCars = new Request (`https://api.api-ninjas.com/v1/cars?limit=30&make=toyota`,options);

   fetch(toyotaCars)
   .then(response=> response.json())
   .then(arrayOfModels => {
      console.log("Toyota Models");
   
      let models = [];

      arrayOfModels.forEach(model => {
         if(!models.some(m => m.model == model.model)){
            models.push({
               model: model.model
            }) 
         }
      });
      console.log(models);
   });
   
 // Med async function  

 async function getModels (car) {
   const rqst = new Request (`https://api.api-ninjas.com/v1/cars?limit=30&make=`+car, options);
   const responce = await fetch(rqst);
   const data = await responce.json();
   return data;
 }

 getModels("toyota")
 .then(data => {
    const models = [];

    data.forEach(data => {
       if(!models.some(m => m.model === data.model)){
          models.push({
             model: data.model,
             repeat:1
          })
       } else {
          models.find(m => m.model === data.model).repeat++;
       }
    })
    console.log(models);
 })
 .catch(error => console.log(error));


// 4
// Vi forstätter med bilarna.
// Nu ska ni fixa koden som i slutet kan logga:
// `Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${X} bilar med manual transmission och ${Y} med automatic transmission`
// Ni behöver alltså hämta X, och Y och skriva om båda på samma console.log
// Gör detta: 
// 4.1 Genom att chaina promises
// 4.2 Med hjälp av async och await 

//4.1
const r4M = new Request('https://api.api-ninjas.com/v1/cars?make=Toyota&year=2010&drive=fwd&transmission=m&limit=30', options);
const r4A = new Request('https://api.api-ninjas.com/v1/cars?make=Toyota&year=2010&drive=fwd&transmission=a&limit=30', options);

let countM, countA;
function logger(m, a) {
    console.log(`Om vi snackar fwd-bilar så släppte Toyota, år 2010, ${m} bilar med manual transmission och ${a} med automatic transmission`);
}
fetch(r4M)
    .then(r => r.json())
    .then(data => {
        countM = data.length;
        return fetch(r4A);
    })
    .then(r => r.json())
    .then(data => {
        countA = data.length;
        console.log("Övning 4.1 - Chained");
        logger(countM, countA);
    });

//med async function 4.2

async function getCount(request) {
   const response = await fetch(request);
   const data = await response.json();
   return data.length;
}
async function f4() {
   const countM = await getCount(r4M);
   const countA = await getCount(r4A);
   console.log("Övning 4.2 - Async");
   logger(countM, countA);
}
f4();
