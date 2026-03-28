let all = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood =('create');
let tmb ;
//get total
function getTotal() {
if(price.value !='') {
    let result= ( +price.value+ +taxes.value+ +ads.value )- +discount.value
    total.innerHTML=result;
 total.style.backgroundColor='yellowgreen'
}else{
    total.innerHTML='' ;
    total.style.backgroundColor= 'rgb(21, 185, 214)';

}

}

let datapro ;

if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}else{datapro=[];
}

submit.onclick = function (){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
    if(title.value !='' &&price.value !=''&&category.value !='' &&newpro.count<300){
         if(mood==='create'){       
        if(newpro.count>1){
        for(let i=0;i< newpro.count;i++){
            datapro.push(newpro) ;
        }
    }else{
    datapro.push(newpro) ;} 
    }else{
        datapro[tmb]=newpro;
        mood='create';
        submit.innerHTML='create'
        count.style.display='block'
    }
    cleardata()
    }
   
    
   
   
    localStorage.setItem('product', JSON.stringify(datapro))
    
    shawdata()
}
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
function shawdata(){
    getTotal()

    let table=''
    for( let i=0; i< datapro.length;i++ ){
table +=`
    <tr>
    <th>${i+1}</th>
    <th>${datapro[i].title}</th>
    <th>${datapro[i].price}</th>
    <th>${datapro[i].taxes}</th>
    <th>${datapro[i].ads}</th>
    <th>${datapro[i].discount}</th>
    <th>${datapro[i].total}</th>
    <th>${datapro[i].category}</th>
    <td><button onclick="updatedata (${i})" id="update">update </button></td>
    <td><button onclick="deletedata (${i})" id="delete"> delete</button></td>

</tr>
   `

     }
    
     document.getElementById('tbody').innerHTML=table;
     
     let btndelete=document.getElementById('deleteall');
      if(datapro.length>0){
        btndelete.innerHTML=`
        <button onclick="deleteall()">delete All(${datapro.length})</button>
        `
}else{
     btndelete.innerHTML='';
}




}
shawdata()
function deletedata(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro)
    shawdata()

}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    shawdata()
}
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal()
    category.value=datapro[i].category;
    count.style.display='none'
    submit.innerHTML='update'
    mood='update'
    tmb=i;
scroll({top:0,
    behavior:"smooth"
})
}
let searchmood='title2';
function getsearchmood(id){
    let search=document.getElementById('sr');
if(id=='st'){
    searchmood='title2';
search.placeholder='search by title';
}else{
    searchmood='category';
    search.placeholder='search by category';
}
search.focus()
search.value='';
shawdata();
}
function searchdata(value){
    let table ='';
if(searchmood=='title2'){
for( let i=0; i<datapro.length;i++){
    if(datapro[i].title.includes(value.toLowerCase())){
        
        table +=`
        <tr>
        <th>${i+1}</th>
        <th>${datapro[i].title}</th>
        <th>${datapro[i].price}</th>
        <th>${datapro[i].taxes}</th>
        <th>${datapro[i].ads}</th>
        <th>${datapro[i].discount}</th>
        <th>${datapro[i].total}</th>
        <th>${datapro[i].category}</th>
        <td><button onclick="updatedata (${i})" id="update">update </button></td>
        <td><button onclick="deletedata (${i})" id="delete"> delete</button></td>
    
    </tr>
       `;
        
    }
}

}else{
    for( let i=0; i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            
            table +=`
            <tr>
            <th>${i+1}</th>
            <th>${datapro[i].title}</th>
            <th>${datapro[i].price}</th>
            <th>${datapro[i].taxes}</th>
            <th>${datapro[i].ads}</th>
            <th>${datapro[i].discount}</th>
            <th>${datapro[i].total}</th>
            <th>${datapro[i].category}</th>
            <td><button onclick="updatedata (${i})" id="update">update </button></td>
            <td><button onclick="deletedata (${i})" id="delete"> delete</button></td>
        
        </tr>
           `;
            
        }
    }
}
document.getElementById('tbody').innerHTML=table;
}