// Fetching data// Fetching data// Fetching data
let allMobile;
let mobAll;
try {
  getData();
  async function getData() {
    const res = await fetch("./data.json");
    const data = await res.json();
    allMobile = data.mobiles;
    mobAll = data.mobiles;
    filterData(allMobile);
    pagination();
  }
} catch (error) {
  console.log("Sorry there is no data");
}

// Fetching data// Fetching data// Fetching data****

// mobile rendering to DOM// mobile rendering to DOM
const rightMain = document.querySelector(".right-mobiles");
function showAllMobile(mobiles) {
  mobiles.forEach((mobile) => {
    rightMain.innerHTML += `
                    <div class="mobile">
                        <div class="mobile-in">
                            <div class="mobile-img-container">
                                <div class="mobile-img">
                                    <img src="${
                                      mobile.mobImg
                                    }" alt="" class="mobImage">
                                </div>
                                <div class="addTo">
                                    <input type="checkbox">
                                    <label>Add to Compare</label>
                                </div>
                            </div>
                            <div class="mobile-details">
                                <div class="mobile-det-left">
                                    <div class="phoneName">${
                                      mobile.mobName
                                    }</div>
                                    <div class="star-rating">
                                        <div class="green-star">
                                            ${
                                              mobile.star
                                            } <img src="img/star.svg" alt="rating">
                                        </div>
                                        <div class="ratings"><span>${mobile.rating.toLocaleString()} Ratings & ${
      mobile.reviews
    } Reviews</span></div>
                                    </div>
                                    <div class="full-details">
                                        <ul>
                                            <li>${mobile.rom}</li>
                                            <li>${mobile.display}</li>
                                            <li>${mobile.camera}</li>
                                            <li>${mobile.battery}</li>
                                            <li>${mobile.chip}</li>
                                            <li>${mobile.warranty}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="mobile-det-right">
    
                                    <div class="price-det">
                                        <div class="rate">
                                            <div class="dis-rate">₹${mobile.disRate.toLocaleString()}</div>
                                            <div class="ret-price">₹${
                                              mobile.retRate
                                            }</div>
                                            <div class="off">${mobile.off}</div>
                                        </div>
                                        <div class="free">Free delivery</div>
                                    </div>
                                    <div class="f-plus"><img src="${
                                      mobile.assured
                                    }" alt="" height="20px"></div>
                                    <div class="upto-main">
                                        <div class="upto">Upto</div>
                                        <div class="ex-rate">₹${
                                          mobile.exchange
                                        }</div>
                                        <div class="upto">Off on Exchange</div>
                                    </div>
                                    <div class="emi">
                                        <span>No cost EMI from ₹${
                                          mobile.emi
                                        }/month</span>
                                    </div>
                                </div>
                              </div> 
                        </div>
                    </div>     
        
        `;
  });
}
// mobile rendering to DOM// mobile rendering to DOM****

// clear all btn function// clear all btn function

inputCheckBoxes = document.querySelectorAll("input[type='checkbox']");

let arrayCheck = [];
inputCheckBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    if (checkBox.checked) {
      arrayCheck.push(e.target.id);
      console.log("data is ad", arrayCheck);
      ClearAll();
    } else {
      arrayCheck = arrayCheck.filter((item) => item != e.target.id);
      console.log("data is removed", arrayCheck);
      ClearAll();
    }
  });
});
const ClearBtn = document.querySelector(".clear");
function ClearAll() {
  if (arrayCheck.length != 0) {
    ClearBtn.classList.remove("hide");
  } else {
    ClearBtn.classList.add("hide");
  }
}

ClearBtn.addEventListener("click", () => {
  window.location.reload();
});

// clear all btn function// clear all btn function***

// mobile filtering // mobile filtering // mobile filtering

checkBoxes = {
  brands: [],
  ratings: [],
  ram: [],
};

checkboxBrands = document.querySelectorAll(".br-sear input[type='checkbox']");
checkboxRatings = document.querySelectorAll(".rating input[type='checkbox']");
checkboxRams = document.querySelectorAll(".rams-col input[type='checkbox']");

let mobiles;

function filterData(data) {
  console.log(data);

  mobiles = data;
  checkboxBrands.forEach((brand) => {
    brand.addEventListener("click", (e) => {
      if (e.target.checked) {
        checkBoxes.brands.push(e.target.id);
        console.log(checkBoxes);
      } else {
        checkBoxes.brands = checkBoxes.brands.filter(
          (item) => item != e.target.id
        );
        console.log(checkBoxes);
      }
      loopCheck(mobiles, checkBoxes);
    });
  });
  checkboxRatings.forEach((rating) => {
    rating.addEventListener("click", (e) => {
      if (e.target.checked) {
        checkBoxes.ratings.push(e.target.value);
        console.log(checkBoxes);
      } else {
        checkBoxes.ratings = checkBoxes.ratings.filter(
          (item) => item != e.target.value
        );
        console.log(checkBoxes);
      }
      loopCheck(mobiles, checkBoxes);
    });
  });
  checkboxRams.forEach((ram) => {
    ram.addEventListener("click", (e) => {
      if (e.target.checked) {
        checkBoxes.ram.push(e.target.value);
        console.log(checkBoxes);
      } else {
        checkBoxes.ram = checkBoxes.ram.filter(
          (item) => item != e.target.value
        );
        console.log(checkBoxes);
      }
      loopCheck(mobiles, checkBoxes);
    });
  });

  //   showAllMobile(mobiles);
}

console.log(checkBoxes);
let newdata;
function loopCheck(mobiles, boxes) {
  // isNewData=false
  newdata = [];
  let mobileList = boxes.brands;
  if (mobileList.length != 0) {
    mobileList.forEach((item) => {
      let filtered = allMobile.filter((phone) => phone.brand == item);
      newdata.push(...filtered);
      console.log(newdata);
      rightMain.innerHTML = "";
      //   showAllMobile(newdata);
      pagination();
    });
  } else {
    rightMain.innerHTML = "";
    // showAllMobile(allMobile);
    pagination();
  }

  let ratingList = boxes.ratings;
  if (ratingList.length != 0) {
    if (newdata.length != 0) {
      let minRat = Math.min(...ratingList);
      let ratingFilter = [];
      ratingFilter = newdata.slice();
      newdata = ratingFilter.filter((item) => item.star >= minRat);
      rightMain.innerHTML = "";
      //   showAllMobile(newdata);
      pagination();
    } else {
      let minRat = Math.min(...ratingList);
      let ratingFilter = [];
      ratingFilter = allMobile.slice();
      newdata = ratingFilter.filter((item) => item.star >= minRat);
      rightMain.innerHTML = "";
      //   showAllMobile(newdata);
      pagination();
    }
  }
  let ramList = boxes.ram;
  if (ramList.length != 0) {
    if (newdata.length != 0) {
      let minRam = Math.min(...ramList);
      let ramFilter = [];
      ramFilter = newdata.slice();
      console.log("minimum ram is", minRam);
      //     ramList.forEach((ram) => {
      //         let cc = parseInt(ram);
      //         console.log(cc);

      newdata = ramFilter.filter((item) => item.ram >= minRam);

      rightMain.innerHTML = "";
      //   showAllMobile(newdata);
      pagination();
      //   });
    } else {
      let minRam = Math.min(...ramList);
      let ramFilter = [];
      ramFilter = allMobile.slice();
      console.log("minimum ram is", minRam);
      newdata = ramFilter.filter((item) => item.ram >= minRam);
      rightMain.innerHTML = "";
      //   showAllMobile(newdata);
      pagination();
    }
  }

  console.log(mobileList, ratingList, ramList);
}

// mobile filtering // mobile filtering // mobile filtering*****

// sorting // sorting // sorting

const sortingBtns = document.querySelectorAll(".sort-btn");

function removebtn() {
  for (let i = 0; i < sortingBtns.length; i++) {
    sortingBtns[i].classList.remove("active");
  }
}

let isClick = false;
let isStart = false;
//lllllll
sortingBtns.forEach((button, index) => {
  button.addEventListener("click", (btn) => {
    // isNewData=false
    removebtn();
    button.classList.add("active");
    console.log(btn, index);
    if (index == 0) {
      isClick = true;
      isStart = true;
      if (arrayCheck.length === 0) {
        allMobile.sort((a, b) => b.rating - a.rating);
      } else {
        newdata.sort((a, b) => b.rating - a.rating);
      }
      rightMain.innerHTML = "";
      pagination();
    }

    if (index == 1) {
      isClick = true;
      isStart = true;
      if (arrayCheck.length === 0) {
        allMobile.sort((a, b) => a.disRate - b.disRate);
      } else {
        newdata.sort((a, b) => a.disRate - b.disRate);
      }

      rightMain.innerHTML = "";
      pagination();
    }
    if (index == 2) {
      isClick = true;
      isStart = true;
      if (arrayCheck.length === 0) {
        allMobile.sort((a, b) => b.disRate - a.disRate);
      } else {
        newdata.sort((a, b) => b.disRate - a.disRate);
      }

      rightMain.innerHTML = "";
      pagination();
    }
    if (index == 3) {
      isClick = true;
      isStart = true;
      if (arrayCheck.length === 0) {
        allMobile.sort((a, b) => b.star - a.star);
      } else {
        newdata.sort((a, b) => b.star - a.star);
      }
      rightMain.innerHTML = "";
      pagination();
    }
  });
});

//llll

console.log(allMobile);

// sorting // sorting // sorting

// min and max// min and max// min and max
const minValue = document.querySelector("#min");
const maxValue = document.querySelector("#max");
let firstSelect = minValue.value;
let secondSelect = maxValue.value;
minValue.addEventListener("click", () => {
  firstSelect = minValue.value;
  showMinAndMax();
});
maxValue.addEventListener("click", () => {
  secondSelect = maxValue.value;
  showMinAndMax();
});
let minmaxArr = [];
let minmaxFullArr;
let isNewData = false;
function showMinAndMax() {
  if (arrayCheck.length === 0) {
    console.log(firstSelect, secondSelect);
    minmaxArr.splice(0, minmaxArr.length);
    minmaxArr.push(firstSelect, secondSelect);
    console.log(minmaxArr);
    minmaxFullArr = mobAll;
    filterMinMaxArray = minmaxFullArr.filter((mobile) => {
      return mobile.disRate >= minmaxArr[0] && mobile.disRate <= minmaxArr[1];
    });
    console.log(filterMinMaxArray);
    allMobile = filterMinMaxArray;
    console.log(mobileSet);
    rightMain.innerHTML = "";
    pagination();
  } else {
    isNewData = true;
    minmaxArr.splice(0, minmaxArr.length);
    minmaxArr.push(firstSelect, secondSelect);

    console.log(newDataSlice);

    minmaxFullArr = newdataAll;
    console.log("dafad", minmaxFullArr);

    filterMinMaxArray = minmaxFullArr.filter((mobile) => {
      return mobile.disRate >= minmaxArr[0] && mobile.disRate <= minmaxArr[1];
    });
    console.log(filterMinMaxArray);
    newdata = filterMinMaxArray;
    console.log(newDataSlice);
    rightMain.innerHTML = "";
    pagination();
  }
}
// min and max// min and max// min and max

// pagination// pagination// pagination

const showingPage = document.querySelector("#showPage");
const pageNumber = document.querySelector("#pageNumberShow");

let tenMobiles;
let start = 0;
let limit = 10;
let currentPage = 1;
let mobilesCount;
let sortedArray;
let mobileSet;
let newDataSlice;
let newdataAll;

function pagination() {
  if (arrayCheck.length === 0) {
    if (!isClick) {
      mobileSet = allMobile.sort((a, b) => b.rating - a.rating);
    } else {
      mobileSet = allMobile;
    }

    mobilesCount = mobileSet.length;
    console.log(mobileSet);
    start = 0;
    console.log(mobilesCount);
    let minCount = start * limit;
    let maxCount = (start + 1) * limit;

    numberOfPage = Math.ceil(mobilesCount / limit);
    pageNumber.innerHTML = "";
    for (let i = 1; i <= numberOfPage; i++) {
      pageA = document.createElement("a");
      pageA.innerHTML = i;
      pageA.classList.add("pageNumber");
      if (i == 1) {
        pageA.classList.add("active");
      }
      pageNumber.appendChild(pageA);
    }

    pageAall = document.querySelectorAll(".pageNumber");
    pageAall.forEach((page) => {
      page.addEventListener("click", (e) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        removeActive();
        page.classList.add("active");
        start = parseInt(e.target.textContent) - 1;
        console.log(currentPage);
        minCount = start * limit;
        maxCount = (start + 1) * limit;
        tenMobiles = mobileSet.slice(minCount, maxCount);
        console.log(tenMobiles);
        rightMain.innerHTML = "";
        showAllMobile(tenMobiles);
        if (maxCount > mobilesCount) {
          maxCount = mobilesCount;
        }
        showingPage.innerHTML = `(Showing ${
          minCount + 1
        } - ${maxCount} products of ${mobilesCount} products)`;
        console.log(maxCount);
      });
    });
    function removeActive() {
      let ppp = [...pageAall];
      console.log(ppp);

      for (let i = 0; i < ppp.length; i++) {
        ppp[i].classList.remove("active");
        // console.log(ppp[i]);
      }
    }

    console.log(start, "startttt");
    if (maxCount > mobilesCount) {
      maxCount = mobilesCount;
    }

    showingPage.innerHTML = `(Showing ${
      minCount + 1
    } - ${maxCount} products of ${mobilesCount} products)`;
    tenMobiles = mobileSet.slice(minCount, maxCount);
    console.log(tenMobiles);

    showAllMobile(tenMobiles);
  } else {
    if (!isClick) {
      newDataSlice = newdata.sort((a, b) => b.rating - a.rating);
    } else {
      newDataSlice = newdata;
    }
    if (!isNewData) {
      newdataAll = newdata;
    }

    newDataSlice = newdata;
    console.log("shhhhh", newDataSlice);
    start = 0;
    let mobilesCount = newDataSlice.length;
    console.log(mobilesCount);
    if (mobilesCount < limit) {
      start = 0;
    }
    let minCount = start * limit;
    let maxCount = (start + 1) * limit;
    numberOfPage = Math.ceil(mobilesCount / limit);
    pageNumber.innerHTML = "";
    for (let i = 1; i <= numberOfPage; i++) {
      pageA = document.createElement("a");
      pageA.innerHTML = i;
      pageA.classList.add("pageNumber");
      if (i == 1) {
        pageA.classList.add("active");
      }

      pageNumber.appendChild(pageA);
    }

    pageAall = document.querySelectorAll(".pageNumber");
    pageAall.forEach((page) => {
      page.addEventListener("click", (e) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        removeActive();
        page.classList.add("active");
        start = parseInt(e.target.textContent) - 1;
        console.log(currentPage);
        let minCount = start * limit;
        let maxCount = (start + 1) * limit;
        tenMobiles = newDataSlice.slice(minCount, maxCount);
        console.log(tenMobiles);
        rightMain.innerHTML = "";
        showAllMobile(tenMobiles);
        if (maxCount > mobilesCount) {
          maxCount = mobilesCount;
        }
        showingPage.innerHTML = `(Showing ${
          minCount + 1
        } - ${maxCount} products of ${mobilesCount} products)`;
      });
    });
    function removeActive() {
      let ppp = [...pageAall];
      console.log(ppp);

      for (let i = 0; i < ppp.length; i++) {
        ppp[i].classList.remove("active");
        // console.log(ppp[i]);
      }
    }

    if (maxCount > mobilesCount) {
      maxCount = mobilesCount;
    }
    showingPage.innerHTML = `(Showing ${
      minCount + 1
    } - ${maxCount} products of ${mobilesCount} products)`;
    tenMobiles = newDataSlice.slice(minCount, maxCount);
    console.log(tenMobiles);

    showAllMobile(tenMobiles);
  }
}

// pagination// pagination// pagination****
