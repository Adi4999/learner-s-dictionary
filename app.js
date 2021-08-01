
let input=document.querySelector('#input');
let btn=document.querySelector('#Search');
let apiKey="5b393ae0-8d85-43d1-8956-123765eb092e";
let notFound=document.querySelector('.not_found ');
let defBox=document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.loading');



btn.addEventListener('click',function(e){
    e.preventDefault();
    audioBox.innerHTML='';
    notFound.innerHTML='';
    defBox.innerHTML='';
   let word=input.value;
   if(word===""){
       alert("Enter a word...");
       return;
   }
   if(word.includes(' ')){
    alert("Search for one word at a time")
     return;
    }
    getData(word);

})


input.addEventListener('keydown',function(e){
    
if(e.key=="Enter"){
    e.preventDefault();
    audioBox.innerHTML='';
    notFound.innerHTML='';
    defBox.innerHTML='';
   let word=input.value;
   if(word===""){
       alert("Enter a word...");
       return;
   }
   if(word.includes(' ')){
   alert("Search for one word at a time")
    return;
   }
   getData(word);
}
})



async function  getData (word){
    loading.style.display='block';
  const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

const data= await response.json();
if(!data.length){
    loading.style.display='none';
    notFound.textContent='No result found  :/';
    return;
}
if(typeof data[0]==='string'){
    loading.style.display='none';

    let heading=document.createElement('h3');
    //
    let sugg=document.createElement('div')
    sugg.classList.add('sugg')
//
    heading.textContent='Did you mean ?';

    notFound.appendChild(heading);
    //
    notFound.appendChild(sugg);
//
    data.forEach(element=>{
        let suggestion=document.createElement('span'); 
        suggestion.classList.add('suggested');
        suggestion.textContent=element;
        sugg.appendChild(suggestion);
       
    })
    //
     let all=document.querySelectorAll('.suggested')
     console.log(all);

     for(let i=0;i<all.length;i++){
         all[i].addEventListener('click',function(){
            audioBox.innerHTML='';
            notFound.innerHTML='';
            defBox.innerHTML='';
          
            word=all[i].textContent;
           input.value=word;
            getData(word);
         })
     }
    
    
    //
    return;
}
loading.style.display='none';
let defination=data[0].shortdef[0];
defBox.innerHTML=`<strong>Definition</strong> : ${defination}.`;
const soundName= data[0].hwi.prs[0].sound.audio;
if(soundName){
   renderSound(soundName); 
}


 
//console.log(data);


}

function renderSound(soundName){
    //https://media.merriam-webster.com/soundc11 
    let subfolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;
    let aud=document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);
}
