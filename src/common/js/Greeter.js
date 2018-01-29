var greatJson = require('../json/config.json');
function greet(){
    let _div = document.createElement('div');
    _div.textContent = greatJson.greetText;
    return _div;
}
export {greet};
