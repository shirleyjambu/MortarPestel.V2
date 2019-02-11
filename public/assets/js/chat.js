//Function to send message
function sendChatMessage(userName){
  var message = $("#message").val();
  
  chatRef.push({
    name:userName,
    message:message
  });
  $("#message").val("");
}

//Add message to the Chat Window
function addChatMessage(userName,message){
  $("#chatBox").append(`<p>${userName}:${message}</p>`);
}

function setJoinGameButton(userName,uid){
    console.log("SEtting Join Button");
    $("#joinGameSp").append(`<button id='${uid}'>Join ${userName}</button>`);
}

//Set Current User Name
function setCurrentUserName(){
  var user=firebase.auth().currentUser;
  if(user){
    userName = user.displayName;
    $("#userName").text(userName);
  }else{
    let userNamels=localStorage.getItem("rpsUserName");
    $("#userName").text(userNamels);
  }
  
};