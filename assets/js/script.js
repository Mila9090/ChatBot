window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.footer__form'),
            inputMessage = form.querySelector('.footer__input'),
            time = document.querySelector('.header__date'),
            main = document.querySelector('.main'),
            messages = [],
            botMessages = [];
    if (localStorage.getItem('content') !== null) {
        time.textContent = localStorage.getItem('time');
        main.innerHTML = localStorage.getItem('content');
    }


    const answers = new Map([
        ["Привет", "Привет! Рада познакомиться)"],
        ["Где хранить деньги?", "Под подушкой"],
        ["Как дела?", "Могло бы быть и лучше"],
        ["Где купить билет на самолет?", "Авиасейлс! Авиасейлс - самые дешевые авиабилеты"],
        ["Я голодный", "Я тоже. Давайте закажем еду!"],
        ["Куда поехать?", "На работу"],
        ["Что такое ChatGPT?", "Сын маминой подруги"],
        ["Сколько сейчас времени?", "Посмотрите на телефоне:)"],
        ["Что почитать?", "Сходите в книжный магазин и выберите понравившуюся книгу"],
        ["Что посмотреть?", "Посмотрите что-нибудь"]
    ]);


    function addMessage(message, nameClass, img, loading = ''){
        const block = document.createElement("div");
        block.classList.add(nameClass);
        block.innerHTML = 
                        `
                        <div class="${nameClass}__picture" style="background-image: url(${img});"></div>
                        <div class="${nameClass}__message">
                            <div class="${loading}">${message}</div>
                        </div>
                        `;
        main.appendChild(block);
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const hourMinute = new Date();
        if (inputMessage.value.trim() !== ''){
            const message = inputMessage.value.trim();
            messages.push(message);
            inputMessage.value = '';
            console.log(messages);
            if (messages.length === 1){
                time.textContent = `Today at ${hourMinute.getHours()}:${hourMinute.getMinutes()}`;
                localStorage.setItem('time', time.textContent);
            }
            addMessage(message, 'human', './assets/img/human.png');
            inputMessage.setAttribute('readonly', 'readonly');
            addMessage('', 'bot', './assets/img/bot.png', 'loading');
            const bots = document.querySelectorAll('.bot');
            const regEx = new RegExp(`^${message}$`, 'i');
            

            setTimeout(() => {
                bots[bots.length - 1].remove();
                inputMessage.removeAttribute('readonly');
                const keys = [...answers.keys()];
                keys.forEach(item => {
                    const cutMessage = item.slice(0, -1);

                    if (regEx.test(cutMessage) || regEx.test(item)){
                        addMessage(answers.get(item), 'bot', './assets/img/bot.png');
                        botMessages.push(item);
                    }
                });
                if (botMessages.length == 0){
                    addMessage('Я не понимаю вас', 'bot', './assets/img/bot.png');
                } else {
                    botMessages.length = 0;
                }
                const content = main.innerHTML;
                localStorage.setItem('content', content);
            }, 2000);
            main.scrollTop = main.scrollHeight;
        }
    });

    
});