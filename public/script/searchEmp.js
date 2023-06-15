let searchBtn = document.getElementById('searchBtn')
let clearBtn = document.getElementById('clearBtn')

let nameInput = document.getElementById("nameSearch")
let mobileInput = document.getElementById("mobileSearch")

searchBtn.addEventListener('click',()=>{
    console.log("search clicked")
    let name = nameInput.value;
    let mobile = mobileInput.value;

    let obj= {
        name: name.trim(),
        mobile: mobile.trim()
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/searchUser');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(obj));
    xhr.addEventListener('load',()=>{
        // console.log('search xhr response >',xhr.responseText);


        let obj = JSON.parse(xhr.responseText);
        console.log(obj,typeof(obj))

        let data = obj.data;

        if(obj.noUser){
            document.getElementById("user-list").innerHTML = `<h2>No matching records found!</h2>`
        }
        else{
            let t1 = `
            <table id="user-table">
            <tr>
              <th>First Name</th>
              <th>Last name</th>
              <th>Mobile No</th>
              <th>Email Id</th>
              <th>Gender</th>
              <th>Birth Date</th>
              <th>Counrty</th>
              <th>City</th>
              <th>Action</th>
            </tr>
            </table>
            `
            document.getElementById('user-list').innerHTML=t1;
            for(let i=0; i< data.length; i++){
                let trchild = document.createElement("tr");
                trchild.id = `tr-${data[i].id}`;

                let t2 = `
                
                <td>${data[i].fName}</td>
                <td>${data[i].lName}</td>
                <td>${data[i].mobileNumber}</td>
                <td>${data[i].email}</td>
                <td>${data[i].dateOfBirth}</td>
                <td>${data[i].gender}</td>
                <td>${data[i].country}</td>
                <td>${data[i].city}</td>
                <td>
                  <button id="${data[i].id}" class="btn btn-secondary btn-sm editBtn mx-2" >Edit</button>
                  <button id="${data[i].id}" class="btn btn-danger btn-sm deleteBtn mx-2" >Delete</button>
                </td>
                `
                trchild.innerHTML = t2;
                document.getElementById("user-table").appendChild(trchild)
                
                abc()
            }
        }

    })
})

clearBtn.addEventListener('click',()=>{
    nameInput.value = "";
    mobileInput.value = "";
})



function abc(){
    let editBtnArr = document.getElementsByClassName('editBtn');
    for(let i=0;i<editBtnArr.length;i++){
    editBtnArr[i].addEventListener('click',(event)=>{
        let id = event.target.id;

        console.log("edit btn",i,id);

        obj = {
            id:id
        }

        let xhr = new XMLHttpRequest();
        xhr.open('PUT','/searchUser');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(obj));
        xhr.addEventListener('load',()=>{
            console.log('edit xhr response >',xhr.responseText);
            document.open()
            document.write(xhr.responseText)
            document.close()

        })
    })
}

let deleteBtnArr = document.getElementsByClassName('deleteBtn');
for(let i=0;i<deleteBtnArr.length;i++){
    deleteBtnArr[i].addEventListener('click',(event)=>{
        let id = event.target.id;

        console.log("delete btn",i,id);

        obj = {
            id:id
        }

        let xhr = new XMLHttpRequest();
        xhr.open('DELETE','/searchUser');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(obj));
        xhr.addEventListener('load',()=>{

            let obj = JSON.parse(xhr.responseText);
            console.log(obj)
            if(obj.success) {
                // delete that tr
                document.getElementById(`tr-${id}`).remove();
                alert("User deleted successfully")

            }
            // else alert(obj.msg)

        })
    })
    }
}


abc()


