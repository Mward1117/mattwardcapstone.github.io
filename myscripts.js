var periodIndex = 0;
//notes=0
//assignments = 1
var viewIndex = 0;

//var data = {notes:[],assignments:[]};
var data = [
  {period:1,data:[[],[]]},
  {period:2,data:[[],[]]},
  {period:3,data:[[],[]]},
  {period:4,data:[[],[]]}
];//{id:numeric,text:string}


function saveData() {
  localStorage.setItem("WebData2", JSON.stringify(data));
}

function loadData() {
  let  loadeddata = localStorage.getItem("WebData2");
  if (loadeddata!=null) 
    data = JSON.parse(loadeddata);
}

function addItem() {
  let newId = null;
  if (data[periodIndex].data[viewIndex].length==0){
    newId = 0;

  } 
  else {
    newId = data[periodIndex].data[viewIndex][data[periodIndex].data[viewIndex].length-1].id+1;

  }

  data[periodIndex].data[viewIndex].push({id:newId,text:""});
  saveData();
}
function displayView() {
  // clear the content
  let divContent = document.getElementById("divSavedContent");
  divContent.innerHTML="";

  for(let i=0;i<data[periodIndex].data[viewIndex].length;i++){

    let note = data[periodIndex].data[viewIndex][i];

    let txtNote = document.createElement('textarea');
    txtNote.id="txtnote"+note.id;
    txtNote.onchange=onTextChange;
    txtNote.innerText = note.text;
    txtNote.classList.add("contentSubmissions");

    let btnDelete = document.createElement("button");
    btnDelete.innerText = 'Delete';
    btnDelete.onclick = onDeleteClick;

    let divNote = document.createElement('div');
    divNote.id="divNote"+note.id;
    divNote.appendChild(txtNote);
    divNote.appendChild(btnDelete);
    divContent.appendChild(divNote);
  }
}

function onClick() {
  addItem();
  displayView();
  saveData();
}

function onDeleteClick(clickEvent) { 
  let divContent = document.getElementById("divSavedContent");
  let divNoteId = "" + clickEvent.srcElement.parentElement.id;
  divNoteId=divNoteId.replace("divNote","");

  data[periodIndex].data[viewIndex]=data[periodIndex].data[viewIndex].filter(note => {
    return note.id != divNoteId;
  });

  //divContent.removeChild(clickEvent.srcElement.parentElement);
  displayView();
  saveData();
};

function onTextChange(clickEvent) { 
  let divNoteId = "" + clickEvent.srcElement.parentElement.id;
  divNoteId=divNoteId.replace("divNote","");

  data[periodIndex].data[viewIndex].find(note => {
    return note.id == divNoteId;
  }).text=clickEvent.srcElement.value;
  saveData();
};

function windowClosing() {
  for(let i=0;i<data[periodIndex].data[viewIndex].length;i++){
    data[periodIndex].data[viewIndex][i].text=document.getElementById("txtnote"+data[periodIndex].data[viewIndex][i].id).value;
  }
  saveData();
}