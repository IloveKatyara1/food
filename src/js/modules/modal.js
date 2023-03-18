let modalTimeout;

const timeoutId = setTimeout(() => showModal(modalTimeout, timeoutId, showModalByScroll), 5000);

function showModal(modal, timeoutId, showModalByScroll) {
    modal.classList.add('show');

    document.body.style.overflow = 'hidden';

    if (timeoutId && showModalByScroll) {
        clearInterval(timeoutId);
        window.removeEventListener('scroll', showModalByScroll);
    }
}

function removeModal(modal) {
    modal.classList.remove('show');

    document.body.style.overflow = 'visible';

    const thanks = document.querySelector('.thanks_modal');

    if(thanks) {
        thanks.remove();
        document.querySelector('.modal__dialog').classList.remove('hide');
    }
}

function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
        showModal(modalTimeout, timeoutId, showModalByScroll);

        window.removeEventListener('scroll', showModalByScroll);
    }
}

function modal(modalSection, btnShowModalSection) {
    const btnShowModal = document.querySelectorAll(btnShowModalSection),
          modal = document.querySelector(modalSection);

    modalTimeout = modal;

    btnShowModal.forEach(btn => {
        btn.addEventListener('click', () => showModal(modal, timeoutId, showModalByScroll));
    });

    modal.addEventListener('click', e => {
        if(e.target === modal || e.target.className === 'modal__close') {
            removeModal(modal);
        }
    });

    window.addEventListener('keydown', e => {
        if(e.key === 'Escape' && modal.classList.contains('show')) {
            removeModal(modal);
        }
    });

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal, removeModal, showModalByScroll, timeoutId};