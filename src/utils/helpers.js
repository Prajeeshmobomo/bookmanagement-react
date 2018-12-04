const deepCopy = (object) => {
  if(object && typeof object === 'object' && [Object, Array].includes(object.constructor)) {
    let copy = new object.constructor();
    Object.keys(object).forEach(key => {
      if(typeof object[key] === 'object')
        copy[key] = deepCopy(object[key]);
      else
        copy[key] = object[key];
    });
    return copy;
  }
  return object;
}

const validateEmail = (email) => {
  /* eslint-disable */
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  /* eslint-enable */

  return regex.test(email)
}

const getSubDomain = () => {
  const [subdomain, host, domain] = window.location.hostname.toLowerCase().split('.');
  return domain && host ? subdomain : '';
}

const getbackgroundColor = (percent) => {
  if(percent <= 30)
    return '#D33900';
  else if(percent <= 50)
    return '#E4B647';
  else if(percent <= 70)
    return '#F48E5C';
  else if(percent <= 85)
    return '#58AE56';
  else
    return '#06862D';
};

const scrollTo = (element, to = 0, duration = 100) => {
  if (duration < 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 2;

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    scrollTo(element, to, duration - 2);
  }, 5);
}

const numberWithCommas = (x) => {
  if(!x) return '';
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const arrayRemove = (arr, el, limit ) => {
    var index = 0;
    limit = limit||arr.length;
    var found = arr.indexOf(el);
    while (found !== -1 && index < limit) {
        arr.splice(found, 1);
        found = arr.indexOf(el);
        index++;
    }
}

const objectSearch = (arr, el) => {
  return Object.keys(arr).map((key) => arr[key] === el ? key : -1).find((arr) => arr !== -1);
}

const objectRemove = (arr, el) => {
  var hashKey = objectSearch(arr, el);
  if(hashKey !== undefined) {
    delete arr[hashKey];
  }
}


// supported level 2
const checkObjectDuplicateExists = (array) => {
  if(array.length === 0) {
    return;
  }
  let i = 0, duplicateFound = false;
  while(i <  array.length && !duplicateFound) {
    let input = array[i];
    let arr = [...array.slice(0, i), ...array.slice(i + 1)];
    duplicateFound = arr.some((o) => Object.entries(input).every(([k,v]) => o[k] === v) && Object.keys(input).length === Object.keys(o).length);
    i += 1;
  }
  return duplicateFound;
};

const isObjectArrayEmpty = (array) => {
  let i = 0, empty = true;
  while(i < array.length && empty) {
    let obj = array[i];
    empty = !Object.keys(obj).some((key) => !!obj[key]);
    i += 1;
  }
  return empty;
};


const displayDate = (dateObj , separator = '/') => {
  dateObj = new Date(dateObj);
  let mm = dateObj.getMonth() + 1; 
  let dd = dateObj.getDate();

  return [dateObj.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join(separator);
};

//For input fields - do not modify
const getDateAsString = (dateObj) => { 
  let mm = dateObj.getMonth() + 1; // getMonth() is zero-based
  let dd = dateObj.getDate();

  return [dateObj.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('/');
};

const getTimeAsString = (dateObj) => {
  let hh = dateObj.getHours();
  let mm = dateObj.getMinutes();

  let timeStr = [
    (hh > 9 ? '' : '0') + hh,
    (mm > 9 ? '' : '0') + mm,
  ].join(':');
  return(timeStr + ' ' + (hh >= 12 ? 'PM' : 'AM'))
};

const checkFileExtension = (fileName, extensionsList) => {
  return (new RegExp('(' + extensionsList.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
};

var arraysAreEqual = function (arr1, arr2) {
    if (!Array.isArray(arr1) || ! Array.isArray(arr2) || arr1.length !== arr2.length)
      return false;

    var arr1_sorted = arr1.concat().sort();
    var arr2_sorted = arr2.concat().sort();

    for (var i = 0; i < arr1_sorted.length; i++) {
        if (arr1_sorted[i] !== arr2_sorted[i])
            return false;
    }
    return true;
};

const goBack = function(el) {
  el.context.router.history.goBack(); 
}


const actionTypeSuccess       = (key) => `${key}_SUCCESS`;
const actionTypeFailed        = (key) => `${key}_FAILED`;

const httpSuccess = 200;

const constants = {
  invalidCredentials: 'Invalid Credentials'
}

const getImageUrl = function(book) {
  let baseUrl = process.env.NODE_ENV === 'production' ? 'http://10.2.0.110:3000' : 'http://10.2.0.110:3000';
  let imageUrl = book.cover_photos[0] ? book.cover_photos[0].url : '#';
  return (baseUrl + imageUrl);
}

export default {
  scrollTo,
  deepCopy,
  getSubDomain,
  validateEmail,
  getbackgroundColor,
  numberWithCommas,
  actionTypeSuccess,
  actionTypeFailed,
  arrayRemove,
  objectSearch,
  objectRemove,
  checkObjectDuplicateExists,
  displayDate,
  getDateAsString,
  getTimeAsString,
  checkFileExtension,
  isObjectArrayEmpty,
  arraysAreEqual,
  goBack,
  httpSuccess,
  constants,
  getImageUrl
};

