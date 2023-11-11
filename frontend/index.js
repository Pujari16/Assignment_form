//Name
function validName(){
    var name =document.getElementById('fullname');
    if(name.value.length===0){
        document.getElementById("demo1").innerHTML="Name not specified"; 
        return false;
    }
    else{
        document.getElementById("demo1").innerHTML='<h3>Valid...</h3>';
        return true;
    }
    
}

//Email
function validEmail() {
    var email = document.getElementById('email');
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.length===0){
        document.getElementById("demo2").innerHTML=" Email not specified"; 
        return false;
    }
    else if(!(email.value.match(mailformat))){
    document.getElementById("demo2").innerHTML="Invalid Email";
    return false;
   }
   
    else{
        document.getElementById("demo2").innerHTML='<h3>Valid...</h3>';    
    return true;
}
   
}

//Age
function validAge() {
    var age = document.getElementById('age');

    if(age.value.length===0){
        document.getElementById("demo3").innerHTML="Age not specified..."  
    }
    else if(age.value<0){
        document.getElementById("demo3").innerHTML="Invalid Age...should be positive"  
    }
    else if(isNaN(age.value)){
        document.getElementById("demo3").innerHTML="Invalid Age...should be number" 
    }
    else{
        document.getElementById("demo3").innerHTML='<h3>Valid...</h3>';
        return true;
    }
   
}

//DOB
 function validDOB(){
    var dob = document.getElementById('dob');
    if(dob.value==null||dob.value==""){
        document.getElementById("demo4").innerHTML='DOB not specified...';
        return false; 
    }

    document.getElementById("demo4").innerHTML='';
        return true;
 }
//Form
function validateForm(){
    var error =document.getElementById("demo5");
   if(!validName()|| !validEmail()||!validAge()||!validDOB){
    error.style.display="block";
    error.innerHTML='Please fix the error...';
    setTimeout(function(){error.style.display="none";},3000);
    return false;
   }
}

function submitForm() {
    // Get form data
    var form = document.getElementById('userForm');
    var formData = {
      fullname: document.getElementById('fullname').value,
      email: document.getElementById('email').value, 
      age: document.getElementById('age').value,
      dob: document.getElementById('dob').value
    };
    console.log(formData.dob);
    console.log('Data being sent to the backend (JSON):', JSON.stringify(formData, null, 2));

    // Make a POST request to the backend API
    fetch('https://localhost:7020/api/FormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(formData),
      mode: 'cors',
        })
        .then(async response => {
          const text = await response.text();
            return text ? JSON.parse(text) : {};;
        })
        .then(data => {
          console.log(data);
          location.reload();
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }


















   //mail
   //var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   //if(!(email.match(mailformat)))
   
    //age
    
    