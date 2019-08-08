


const wetherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messgeTwo = document.querySelector('#message-2')

wetherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = search.value
    messageOne.textcontent = 'Loding...'
 messgeTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => 
    { 
        response.json().then((data) =>{
            if(data.error){
            messageOne.textContent = data.error
    
            } else {
            messageOne.textContent= data.location
       messgeTwo.textContent= data.forecast
            }
        })
        
    })
})
