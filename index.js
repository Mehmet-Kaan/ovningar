//1
document.getElementById("add").addEventListener("click", function(){
   let firstNam = document.querySelector("#firstName").value;
   let lastNam = document.querySelector("#lastName").value;
   let bornDate = parseInt(document.querySelector("#born").value);

   fetch(new Request('http://mpp.erikpineiro.se/dbp/users/',
      {
         method: 'POST',
         body: JSON.stringify({firstName:`${firstNam}`, lastName:`${lastNam}`, born: bornDate}),
         headers: {"Content-type": "application/json; charset=UTF-8"},
      }))
      .then( response => {
         if (response.status === 404) {
            console.log("No person with that id in DB");
            throw Error("Person already in DB");
         } else {
            return response.json();
         }
      })
      .then(data => console.log(data))
      .catch(console.log);  
      document.querySelector("#firstName").value = "";
      document.querySelector("#lastName").value = "";
      document.querySelector("#born").value = "";
});

document.getElementById("radera").addEventListener("click", function(){
   
   let firstNam = document.querySelector("#firstName").value;
   let lastNam = document.querySelector("#lastName").value;
   let bornDate = parseInt(document.querySelector("#born").value);

   fetch("http://mpp.erikpineiro.se/dbp/users/")
   .then(response => response.json())
   .then(data => {
    
      let person = data.find(data => data.firstName === firstNam && data.lastName === lastNam && data.born == bornDate);
      console.log(person);

      fetch('http://mpp.erikpineiro.se/dbp/users/',
      {
         method: 'DELETE',
         body: JSON.stringify({id:person.id}),
         headers: {"Content-type": "application/json; charset=UTF-8"},
      })
      .then( response => {
         if (response.status === 404) {
            console.log("No person with that id in DB");
            throw Error("Person already in DB");
         } else {
            return response.json();
         }
      })

   })     
  
   .catch(console.log);  
  
      document.querySelector("#firstName").value = "";
      document.querySelector("#lastName").value = "";
      document.querySelector("#born").value = "";
});

//2

document.querySelector("#search").addEventListener("click", function (){
  
   let searcingName = document.querySelector("#searchingName").value;
   document.querySelector("#names").innerHTML = "";

   fetch("http://mpp.erikpineiro.se/dbp/users/")
   .then(response=>response.json())
   .then(data => {
      console.log(data);
     
         let filteredNames = data.filter( obj => obj.firstName === searcingName);
         console.log(filteredNames);
         filteredNames.forEach(name => {
            let nameDiv = document.createElement("div");
               nameDiv.innerHTML = `
            <p>${name.firstName} ${name.lastName} ${name.born}</p> 
            `;
            document.querySelector("#names").append(nameDiv);
         });
   })
   .catch(error => console.log(error));
   document.querySelector("#searchingName").value = "";
});



//3

document.querySelector("#change").addEventListener("click", function(){
   let originalFirst = document.querySelector("#originalFirst").value;
   let newFirst = document.querySelector("#newFirst").value;
   
   fetch("http://mpp.erikpineiro.se/dbp/users/")
   .then(response => response.json())
   .then(data => {
      let users = data.filter(person => person.firstName === originalFirst);

      users.forEach(user => {
         fetch(`http://mpp.erikpineiro.se/dbp/users/`, {
            method: `PATCH`,
            body: JSON.stringify({
               id: user.id,
               firstName: newFirst,
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"},
         })
         .then(response => response.json())
         .then(data => console.log(data))
      })
   })  
   .catch(error => console.log(error)) 
   document.querySelector("#newFirst").value = "";
   document.querySelector("#originalFirst").value = "";
});