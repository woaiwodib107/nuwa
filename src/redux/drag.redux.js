
const DRAGING = 'DRAGING'
const NOT_DRAGING = 'NOT_DRAGING'

const initState=false

export function dragStatus(state=initState,action){
  switch(action.type){
    case DRAGING:
      return true
    case NOT_DRAGING:
      return false
    default:
      return false
  }
}

export function setDraging(value){
    if(value){
        return {type: DRAGING}
    }else{
        return {type: NOT_DRAGING}
    }
    
}


