export function trimUserName(userName) {
    const nameArray = userName.split(' ');
    let displayName = userName;
    if(nameArray.length > 2) {
        displayName = nameArray[0] + ' ' + nameArray[1];
    } 
    return displayName;
}

export function updateMessageContainerScroll() {
    const messageContainer = document.querySelector('.messages-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
 
  }

export function cleanMessageField() {
    const inputField = document.querySelector('.message-field');
    inputField.value = '';
}