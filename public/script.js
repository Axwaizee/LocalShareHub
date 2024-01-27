var socket = io();
const updatebtn = document.getElementById('updatebtn');
const copybtn = document.getElementById('copybtn');
const clearbtn = document.getElementById('clearbtn');
const textArea = document.getElementById('textarea');

updatebtn.addEventListener('click', () => {
    const newText = textArea.value.trim();
    if (newText !== '') {
        socket.emit('updateText', newText);
        textArea.value = '';
    }
});

copybtn.addEventListener('click', copyClipboard);

clearbtn.addEventListener('click', () => {
    textArea.value = '';
})

function backto_normal_copybtn() {
    copybtn.innerHTML = "Copy";
    copybtn.disabled = false;
}

async function copyClipboard() {
    let copyText = textArea.value;
    copyToClipboard(copyText);
    copybtn.innerHTML = "✔";
    copybtn.disabled = true;
    setTimeout(backto_normal_copybtn, 5000);
}

const unsecuredCopyToClipboard = (text) => { const textArea = document.createElement("textarea"); textArea.value = text; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try { document.execCommand('copy') } catch (err) { console.error('Unable to copy to clipboard', err) } document.body.removeChild(textArea) };

const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(content);
    } else {
        unsecuredCopyToClipboard(content);
    }
};


socket.on('updatedText', (updatedText) => {
    textArea.value = updatedText;
});
