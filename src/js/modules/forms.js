import {showModal, removeModal, showModalByScroll, timeoutId} from './modal';
import{postData} from '../services/services';

function forms(modal, url) {
    const forms = document.querySelectorAll('form');

    const massage = {
        loading: 'icons/spinner.svg',
        success: 'заявка відправлена, чикайте дзвінка',
        failure: 'щось пішло не так, попробуйте пізніше'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData(url, json)
            .then(data => {
                console.log(data);
                addThanksModal(massage.success);
            })
            .catch(() => addThanksModal(massage.failure))
            .finally(() => {
                massageBlock.remove();
                form.reset();
            });

            const massageBlock = document.createElement('img');
            massageBlock.src = massage.loading;
        
            form.append(massageBlock);
        });
    }

    function addThanksModal(message) {
        const dialog = document.querySelector('.modal__dialog');
        dialog.classList.add('hide');

        showModal(modal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog', 'thanks_modal');
        
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        modal.append(thanksModal);

        window.removeEventListener('scroll', showModalByScroll);
        clearInterval(timeoutId);

        setTimeout(() => {
            thanksModal.remove();

            dialog.classList.remove('hide');
            removeModal(modal);
        }, 4000);
    } 
}

export default forms;