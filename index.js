async function getUsers(){
    let response = await fetch("http://mpp.erikpineiro.se/dbp/users/");
    let data = await response.json();
    return data;
}

getUsers()
.then(data => {
    console.log(data);
    // data.message.forEach(user => {

    //   let p = document.createElement("p");
    //     p.innerText = user.alias;

    // //     document.body.append(p);
    // });
})