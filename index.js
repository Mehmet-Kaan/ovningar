async function getUsers(){
    let response = await fetch("http://mpp.erikpineiro.se/dbp/sameTaste/users.php");
    let data = await response.json();
    return data;
}

getUsers()
.then(data => {
    data.message.forEach(user => {
      let p = document.createElement("p");
        p.innerText = user.alias;

        document.body.append(p);
    });
})