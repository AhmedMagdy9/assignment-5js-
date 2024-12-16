
let btnSearch = document.querySelector('#btnSearch')
let selectObtion = document.querySelector('#selectObtion')
let selectObtionday = document.querySelector('#selectObtionday')
let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



let daysList = [];
let oneDay = []


async function getweather(q = 'cairo' , lang = 'eng' , day = 3){
    
    // let demo  = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=688ae0e5d6204a43b1c112848220606&q=${q}&days=3&lang=${lang}`)
    let demo = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8757b22c252c4041b6543355240712&q=${q}&days=${day}&lang=${lang}`)
    let demo2 = await demo.json()
    if(demo2.current !== undefined){
      
      oneDay = demo2.current

      daysList = demo2.forecast.forecastday
      currentCity = demo2.location.name
    }else{
      console.log('error');
      
    }

  
   dsplay(currentCity)
}


getweather()

function dsplay(city){
  firstDiv(city)

   let temp = ''

   for (let i = 1; i < daysList.length; i++) {
    let datetest = new Date(daysList[i].date)
    temp +=`  <div class=" col-md-6 col-lg-4 item pb-5 text-center">
       
      <header >
        <p>${daysOfWeek[datetest.getDay()]}</p>
        
      </header>
      <div class="py-5">
      <img class="mego" src="${daysList[i].day.condition.icon}" alt="">
      <p class="fs-3 fw-bold">${daysList[i].day.maxtemp_c}°c</p>
      <p class="fs-4 text-secondary">${daysList[i].day.mintemp_c}°</p>
      <p class="text-info">${daysList[i].day.condition.text}</p>
      </div>
     </div>`
        
   }
   document.querySelector('#myrow').innerHTML += temp
}




function firstDiv(city){
  let manth = new Date(oneDay.last_updated)
  let manthNum = manth.getMonth()
  let date = manth.getDate()

let day = new Date().getDay();
let temp = ` <div class=" col-md-6 col-lg-4 item ">
      
  <header class="d-flex justify-content-around">
    <p>${daysOfWeek[day]}</p>
    <p class="text-info ">${(selectObtion.value == `ar`) ? `اليوم` : (selectObtion.value == `fr`) ? `aujourd'hui` : `today` }</p>
    <p>${ date + monthsOfYear[manthNum] }</p>
  </header>
  <div class="p-4">
  <p>${city}</p>
  <p class="fonteSize">${oneDay.temp_c}°c</p>
  <img src="${oneDay.condition.icon}" alt="">
  <p class="text-info">${oneDay.condition.text}</p>

  <span class="me-3"><img src="img/icon1.png" alt=""> 20%</span>
<span class="me-3"><img src="img/icon2.png" alt=""> 18km/h</span>
<span class="me-3"><img src="img/icon3.png" alt=""> East</span>
</div>
 </div>`
 document.querySelector('#myrow').innerHTML = temp 
}


//              ALL  events                      // 

btnSearch.addEventListener('input' , function(){
  getweather(btnSearch.value)
})

selectObtion.addEventListener('change' , function(){
  getweather( (btnSearch.value !== '')?btnSearch.value : undefined ,selectObtion.value , selectObtionday.value)


  
})
selectObtionday.addEventListener('change' , function(){
  getweather( (btnSearch.value !== '')?btnSearch.value : undefined , selectObtion.value ,selectObtionday.value)
})




