let langOpt = document.querySelectorAll('select');
let from_text = document.querySelector('.from_text');
let to_translate = document.querySelector('.to_translate');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let cpyBtn = document.querySelector('.bx-copy');
let countNumber = document.querySelector('.code_length');
let transferLang = document.querySelector('.bx-transfer');

langOpt.forEach((get, con) => {
    for(let countryCode in language){

        let selected;
        if(con == 0 && countryCode == "en-GB"){
            selected = "selected";
        } else if(con == 1 && countryCode == "bn-IN"){
            selected = "selected";
        }

        let opts = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`
        get.insertAdjacentHTML('beforeend', opts);

    }
});

from_text.addEventListener('input', function(){
    let content = from_text.value;
    fromContent = langOpt[0].value;
    trans_content = langOpt[1].value; // Use the selected target language code

    let translateLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${trans_content}`; // Use trans_content

    fetch(translateLink).then(translate => translate.json()).then(data => {
        to_translate.value = data.responseData.translatedText;
    });
});

fromVoice.addEventListener('click', function(){
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(from_text.value);
    fromTalk.lang = langOpt[0].value;
    speechSynthesis.speak(fromTalk);
});

toVoice.addEventListener('click', function(){
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(to_translate.value);
    fromTalk.lang = langOpt[0].value;
    speechSynthesis.speak(fromTalk);
});

cpyBtn.addEventListener('click', function(){
    navigator.clipboard.writeText(to_translate.value);
});

from_text.addEventListener('keyup', function(){
    countNumber.innerHTML = `${from_text.value.length}/5,000`;
});

transferLang.addEventListener('click', function(){
    let tempText = from_text.value;
    from_text.value = to_translate.value;
    to_translate.value = tempText;

    let tempOpt = langOpt[0].value;
    langOpt[0].value = langOpt[1].value;
    langOpt[1].value = tempOpt; 
});