import MainContoller from '../controllers/MainContoller';

const getPaginatedDataAndValues = async(text, data, increase, direction, start, limit, forUserTable = false) => {
    let paginatedData = [], startLimit = start, endLimit = limit;
    if(text === ''){
        if(forUserTable){
            paginatedData = await MainContoller.parseUsers(data, startLimit, endLimit)
        } else 
            paginatedData = data.slice(0, 5).map((field) => Object.values(field));   
      } else {
        if(increase && direction === 'NEXT'){
          startLimit = startLimit + 5,
          endLimit = endLimit + 5;
        }
        else {
          if(startLimit >= 5 && endLimit >= 10){
            startLimit = startLimit - 5;
            endLimit = endLimit - 5;
        }else {
            startLimit = 0;
            endLimit = 5;
          }
        }
        if(forUserTable){
            paginatedData = await MainContoller.parseUsers(data, startLimit, endLimit)
        } else 
            paginatedData = data.slice(startLimit, endLimit).map((field) => Object.values(field));
      }
      return {paginatedData, startLimit, endLimit}
}

const getPaginateValues = async (start, limit, direction) => {
    let startLimit = start, endLimit = limit;
    if(direction == 'NEXT'){
        startLimit = startLimit + 5;
        endLimit = endLimit + 5;
      }else {
        if(startLimit >= 5 && endLimit >= 10){
          startLimit = startLimit - 5;
          endLimit = endLimit - 5;
        }
      }
    return { startLimit, endLimit}
}

export default {
    getPaginatedDataAndValues,
    getPaginateValues
}