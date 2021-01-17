export const  isDnetStorageKey = (v) => {
  const tempArr = v.split('-')
  if(tempArr.length>1&&tempArr[0]==='DnetG'){
    return true
  }else{
    return false
  }
}

export const keySort = (a, b)=>{
  const aIndex = Number(a.split('-')[1])
  const bIndex = Number(b.split('-')[1])
  return bIndex - aIndex
}

export const getStorageKeyArr = (localStorage) => {
    const storageKeyArr = [] 
    new Array(localStorage.length).fill("0").forEach((v,i)=>{
      const key = localStorage.key(i)
      if(isDnetStorageKey(key)){
        // 过滤拿到本应用的localStorage键值
        storageKeyArr.push(key)
      }
    })
    storageKeyArr.sort(keySort)
    return storageKeyArr
}