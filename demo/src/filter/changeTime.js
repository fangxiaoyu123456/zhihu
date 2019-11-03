function changeTime (obj){
    return new Date(parseInt(obj)*1000).toLocaleDateString()
}
export default changeTime