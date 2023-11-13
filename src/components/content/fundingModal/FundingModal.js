import React from "react"

import '../../../styles/funding-modal.css'

export default function FundingModal() {
    return (
        <div id="Funding-modal" className="modal fade" tabIndex="-1" aria-labelledby="funding-modal-label"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
                <div className="modal-content">
                    <div className="modal-header">
                            <span className="semi-header-text text-center pt-2 pb-2 pe-3 ps-3 d-flex m-auto"
                                  id="funding-modal-label">
                                Информация о взносах
                            </span>
                    </div>
                    <div className="modal-body d-flex flex-column">
                        <span className="regular-text text-center mb-2 funding-body-header">
                            Хотите выступить на форуме или стать партнером?
                            <br />
                            Ознакомьтесь с вариантами взноса в рамках форума:
                        </span>
                        <span className="regular-text funding-body-price">
                            <strong className="mb-2">
                                Выступление с докладом на секции: 3000 руб
                                <br />
                                Выступление с докладом на секции и участие в выставке it-организаций: 10000 руб
                                <br />
                                Партнерство (выступление с докладом на секции, участие в выставке,
                                размещение логотипов на информационных ресурсах): 20000 руб
                            </strong>
                            <br />
                            Получить платежные реквизиты можно
                            <a href="https://www.istu.edu/ob_irnitu/rekvizity" className="semi-header-text ms-1"
                               target="_blank" rel="noreferrer noopener">
                                по ссылке
                            </a>
                        </span>
                        <br />
                        <span className="regular-text mt-3 funding-body-comment">
                            <strong>ВАЖНО:</strong> при переводе денежных средств введите в поле "Назначение
                            платежа" фразу Форум IDigital38.
                            <br />
                            Квитанцию об оплате необходимо отправить организационному директору Лобановой Дарье в telegram:
                            <br />
                            <a className="regular-text" href="http://t.me/danilysly"
                               target="_blank" rel="noreferrer noopener">
                                @danilysly
                            </a>
                        </span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-bs-dismiss="modal"
                                className="regular-text flex-grow-1 d-flex justify-content-center ms-2">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}