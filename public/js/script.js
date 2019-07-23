const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.querySelector('input[type="text"]');
    const messageParagraph = document.querySelector('#message');
    if (!search.value)
        return console.log('location cannot be empty');

    messageParagraph.textContent = 'Loading...';
    fetch(`/weather?address=${search.value}`).then((res) => {
        return res.json();
    }).then((data) => {
        if (data['error']) {
            messageParagraph.textContent = data['error'];
        } else {
            const result = `${data['forecast']} for address: ${data['location']}`;
            messageParagraph.textContent = result;
        }
    })
})