let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let apiKey='a84f1f70-a218-420f-ab3f-7902d789b9f0';
let notFound=document.querySelector('.not_found');
let defBox=document.querySelector('.def');
let loading =document.querySelector('.loading');


searchBtn.addEventListener('click',function(e){
    e.preventDefault(); //to prevent the page refresh
    
    //CLEAR DATA PURANE DATA KO
    defBox.innerText='';
    notFound.innerText='';

    //Get input data
    let word=input.value; 

    if(word == ''){
        alert('Word is required');
        return;
    }

     //Call Api get data
    getData(word); 

})

//here i create the getData function

async function getData(word){
    loading.style.display='block';
    //ajax call
    //JavaScript program can easily convert JSON data into JavaScript objects.
    //fetch will return the response promise
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    

    //to extract data from ajax call
    //data will consist of all datas of api
    const data=await response.json();

   
    //if empty data result
    if(!data.length){
        loading.style.display='none';
        notFound.innerText=' No result found';
        return;
    }

    //if result is suggestions like example hola
    if(typeof data[0] == 'string'){
        loading.style.display='block';

        //create a element
        let heading=document.createElement('h3');
        heading.innerText='Did you mean?';
        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion=document.createElement('span');
            
            suggestion.classList.add('suggested');
            suggestion.innerText=element;

            notFound.appendChild(suggestion);
        })

        return;
    }

    //RESULT FOUND
    loading.style.display='none';
    let defination=data[0].shortdef[0];
    defBox.innerText=defination;


    /*//AUDIO KE LIYE
    cost soundName=data[0].hwi.prs[0].sound.audio;

    if(soundName)
    {
        //if sound is available
         renderSound(soundName);
    }
    */
    //Lets see what is present in data
    console.log(data);

}


/*funtion renderSound(soundName)
{
    
    let subFolder=soundName.charAt(0);
    let soundSrc=https://media.merriam-webster.com/audio/prons/en/us/wav/${subFolder}/${soundName}.wav;
}
*/