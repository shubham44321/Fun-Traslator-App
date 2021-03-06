const translateButton = document.querySelector("#btn-translate");
const txtToTranslate = document.querySelector("#txt-to-translate");
const translatedText = document.querySelector("#txt-translated"); 
const clearButton = document.querySelector("#btn-clear");
const selectedType = document.querySelector("#select-translation")

const baseUrl = "https://api.funtranslations.com/translate/";

translateButton.addEventListener("click",async () => {
    let textToTranslate = txtToTranslate.value;
    let selectedValue = selectedType.value;
    console.log(selectedValue);
    if(selectedValue !== ""){
        if(textToTranslate !== "" && textToTranslate.trim().length > 0){
            const transalted = await getData(textToTranslate,selectedValue);
            translatedText.innerText = transalted;
        }
        else{
            alert("Please enter text to be translated.")
            txtToTranslate.focus();
        }
    }
    else{
        alert("Select type for translation.");
        selectedType.focus();
    }
});

clearButton.addEventListener("click",() => {
    txtToTranslate.value = "";
    translatedText.innerText = "";
    selectedType.value = "";
});

function appendtextToUrl(text,type){
    return `${baseUrl}${type}.json?text=${text.trim()}`;
}

function errorHandler(ex){
    console.log(`Error in fetching data : ${ex}`);
}

async function getData(text,type){
    const url = encodeURI(appendtextToUrl(text,type));
    const request = await fetch(url)
    .catch(errorHandler);
    try {
        const response = await request.json();
        if(request.status !== 200){
            alert(response.error.message);
            return "";
        }
        else{
            return response.contents.translated;
        }   
    } catch (error) {
        console.log(error);
        alert("Something went wrong.")
    }
}