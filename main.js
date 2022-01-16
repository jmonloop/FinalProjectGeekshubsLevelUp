//Message variables initialization
let messageText = "";
let messagesArray = [];
let dateTime = [];

//Channels variables initialization
const channels = ["General"];
let actualChannel = ["General"]




// Shows the div in HTML by Id
showDiv = () => {
    document.getElementById('NewChannelDiv').style.display = "block";
 }

 // Hides the same div by Id
hideDiv = () => {
    document.getElementById("NewChannelDiv").style.display = "none";
 }

 //Creates JS variables for treatment
 newChannelBox = document.getElementById("NewChannelBox");
 channelsDiv = document.getElementsByClassName("channelsDiv");
 messagesStackDiv = document.getElementById("messagesStack");
 searchFieldBox = document.getElementById("findField");

 //saveNewChannel function adds a new button with the name and the id written by the user.
saveNewChannel= () => {
    //Saves the NewChannelName in newChannel
    let newChannel = document.getElementById("NewChannelBox").value;
    //Adds it to channels array
    channels.push(newChannel);
  
    //Creates a new button for each NewChannel
    let channelButton = document.createElement("BUTTON");
    //Sets the new button name to the last element in 'channels' array
    channelButton.innerHTML = `${channels[channels.length -1]}`;
    //Adds the new button next to the others
    document.getElementById("channelsList").appendChild(channelButton);
    //Assigns the name to the id property
    channelButton.id = `${channels[channels.length -1]}`;

    //Calls hideDiv() for hiding the box
    hideDiv();


    //Sets onclik property to each new button for triggering openchannel()
    document.getElementById(channels[channels.length -1]).addEventListener("click", function openChannel() {
        //Clears the messageStack div
        document.getElementById("messagesStack").innerHTML = "";
        //Sets actualChannel to the clicked button id value
        actualChannel = channelButton.id;
        //Sets the actualChannel to the HTML Title
        document.getElementById("channelName").innerHTML = actualChannel;
        //Filters the messagesArray by the channel selected
        const results = messagesArray.filter(obj => {
            return obj.channel === actualChannel;
          });
    
        //iterates results for writting the new messagesStack of the selected channel
        for (let i=0; i < results.length; i++) {
        let table = document.createElement('table');
        table.innerHTML = "<tr><td><span style='font-size:12px'>"+results.user+" "+results.time+"</span></td></tr><tr>"+results.text+"</tr>";
        document.getElementById("messagesStack").appendChild(table);
        messagesStackDiv.scrollTop =  messagesStackDiv.scrollHeight;
        }
    } );
}


//  Starts saveNewChannel function also by pressing ENTER key in the text box
window.addEventListener("keyup", function (event) {
     // Checking if key pressed is ENTER or not
    // if the focus is on the text field and key pressed is ENTER
    // saveNewChannel function is called
    if (newChannelBox === document.activeElement && event.keyCode == 13) {
        saveNewChannel();
    }
});

//  Starts newMessage function also by pressing ENTER key in the text box
window.addEventListener("keyup", function (event) {
    // Checking if key pressed is ENTER or not
   // if the focus is on the text field and key pressed is ENTER
   // newMessage function is called
   if (NewMessageText === document.activeElement && event.keyCode == 13) {
       newMessage();
   }
});


//  Starts find function also by pressing ENTER key in the text box
window.addEventListener("keyup", function (event) {
    // Checking if key pressed is ENTER or not
   // if the focus is on the text field and key pressed is ENTER
   // newMessage function is called
   if (searchFieldBox === document.activeElement && event.keyCode == 13) {
       find();
   }
});




//Actual Date&Time function
function getDateTime() {
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
return dateTime = date+' '+time;
}


// MESSAGE TREATMENT //
//newMessage object groups the parameters needed for making a message. Also pushes it to messagesarray and adds an HTML table for each message
newMessage: newMessage = () => {
getDateTime();
messageText = document.getElementById("NewMessageText").value
    const message = {
        user: "Javi",
        channel: actualChannel,
        time: dateTime,
        text: messageText,
        pushMessage: pushMessage = () => {
            messagesArray.push(message);
        }        
    }
message.pushMessage();
//addTable function adds a new table to the messagesStack in HTML.
function addTable() {
    //1. Create the element "table"
    let table = document.createElement('table');
    //2.Format that element as a table using the values of the "message" object. Also gives the font size
    table.innerHTML = "<tr><td><span style='font-size:12px'>"+message.user+" "+message.time+"</span></td></tr><tr>"+message.text+"</tr>";
    //3.Appends it in the "messageStack" div
    document.getElementById("messagesStack").appendChild(table);
    messagesStackDiv.scrollTop =  messagesStackDiv.scrollHeight;
}
//Calls addTable function
addTable();
//Once the process has finished, clears the field
document.getElementById('NewMessageText').value = '';
}






//setGeneralChannel is an specific function for the General button Channel because it is pre-created
setGeneralChannel = () => {
    //Clears the messageStack div
    document.getElementById("messagesStack").innerHTML = "";
    //sets actualChannel as General
    actualChannel = "General";
    //sets channelName as actualChannel
    document.getElementById("channelName").innerHTML = actualChannel;
        //filters messagesArray for only showing messages of the actualChannel and returns it to "results"
        const results = messagesArray.filter(obj => {
            return obj.channel === actualChannel;
          });
    

    //Iterates "results" for generating the messagesStack of the selected channel
    //iIn each iteration does:
    for (let i=0; i < results.length; i++) {
        //1. Create the element "table"
       let table = document.createElement('table');
       //2.Format that element as a table using the values of the "results" object. Also gives the font size
       table.innerHTML = "<tr><td><span style='font-size:12px'>"+results.user+" "+results.time+"</span></td></tr><tr>"+results.text+"</tr>";
       //3.Appends it in the "messageStack" div
       document.getElementById("messagesStack").appendChild(table);
       messagesStackDiv.scrollTop =  messagesStackDiv.scrollHeight;
    }
    
    
    
}

window.onload= setGeneralChannel();




// "find" function searches through messagesArray the element introduced in the findField
function find() {
    //Takes value from text field in search bar
    findElement = document.getElementById("findField").value

    //initialites foundChain variable
    let foundChain = [];


    //clears the "messagesStack" div
    document.getElementById("messagesStack").innerHTML = "";

    //Iterates the messagesArray
    for(i=0 ; i<messagesArray.length ; i++) {
        //declares a variable for saving the .text property of each messagesArray iteration
        let textComparison = messagesArray[i].text;
        //if the .text matches the element,
        if ((textComparison.search(findElement) != -1)) {
            //pushes the message into foundChain array
            foundChain.push(messagesArray[i]);
            
            //1. Create the element "table"
            let table = document.createElement('table');
            //2.Format that element as a table using the values of the "foundChain" object. Also gives the font size. Also adds the channel info
            table.innerHTML = "<tr><td><span style='font-size:12px'>"+messagesArray[i].user+" "+messagesArray[i].time+" "+messagesArray[i].channel+"</span></td></tr><tr>"+messagesArray[i].text+"</tr>";
            //3.Appends it in the "messageStack" div
            document.getElementById("messagesStack").appendChild(table);
            messagesStackDiv.scrollTop =  messagesStackDiv.scrollHeight;
        }
    }
    //Once the process has finished, clears the field
    document.getElementById('findField').value = '';
}

// if(messagesArray[i][text].indexOf(findElement)!=-1











