const JSONlocalStorage = JSON.parse(localStorage.getItem('login'))
const JSONlocalStoragePerm = JSON.parse(localStorage.getItem('perm'))
const siteUrl = window.location.href
let permCheck = siteUrl.slice(
    siteUrl.lastIndexOf('/') + 1,
    siteUrl.lastIndexOf('.')
)
console.log(JSONlocalStorage)
if(JSONlocalStorage === null || JSONlocalStoragePerm != permCheck){
    window.location.href = `./logowanie.html`
} 