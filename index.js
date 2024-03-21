const container = document.getElementById("item-container");
const button1 = document.getElementById("sortByMktCap");
const sortByPercentage  = document.getElementById("sortByPercentage");
const input = document.getElementById("search-input")


// User Inter Face
let tableData = [];
function ShowUI(tableData) {
  const table = document.createElement('table');
  const body = document.createElement('tbody');
  
  container.innerHTML = '';
  tableData.map((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td class="align"><img src="${item.image}" alt="Bitcoin"></td>
            <td class="space-left align">${item.name}</td>
            <td class="space" id="left-middile">${item.symbol.toUpperCase()}</td>
            <td class="space">$${item.current_price}</td>
            <td class="space">$${item.total_volume}</td>
            <td class="space price_change_24 ${item.price_change_24h < 0 ? 'dec' : 'inc'}">${item.price_change_percentage_24h}%</td>
            <td class="space">$Mkt Cap:${item.market_cap}</td>
      `
    body.appendChild(row);
  })
  table.appendChild(body);
  container.appendChild(table);
}
ShowUI(tableData)


fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
.then((response) => response.json())
.then((data) => {
    tableData = data;
    ShowUI(data)
})
.catch((err)=>{
  console.log(err)
  console.log("wait few mintues updating data.......");
}
)

// Search Functionalites
let filterdData = [];
function searchFunctionalities(searchText) {
  filterdData = tableData.filter((item) => 
  item.name.toLowerCase().includes(searchText)
  )
  ShowUI(filterdData)
}

input.addEventListener("input",(e)=>{ 
  let searchQuary = e.target.value.toLowerCase();
  searchFunctionalities(searchQuary)
})


sortByMktCap.addEventListener("click",() => {
    tableData.sort((a,b) => {
        return (b.market_cap - a.market_cap)
    })
    ShowUI(tableData)
})
sortByPercentage.addEventListener("click",() => {
  tableData.sort((a,b)=> {
    return (b.price_change_percentage_24h - a.price_change_percentage_24h);
  })
  ShowUI(tableData);
})
