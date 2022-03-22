import React from 'react';
import { useTranslation } from 'react-i18next';
import { GameEvent } from '../stores/dashboardStore';

const PricingInfo: React.FC<{ open: boolean, onClose: () => void, event: GameEvent|null }> = (props) => {
    const {t} = useTranslation("app");
    return <div className={props.open ? "modal fade show":"modal"} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="d-flex">
                        <img src={props.event?.picture} className="me-2" style={{ height: 80, width: 80 }}></img>
                        <div className="d-flex flex-column align-self-end">
                            <span className='font-weight-bold'>{props.event?.name}</span>
                            <span className='font-weight-light'>{props.event?.region}</span>
                        </div>
                    </div>
                    <h4>{t("pricing")}</h4>
                    <table className="table table-borderless ">
                        <tbody>
                            
                            <tr>
                                <td className='font-weight-bold'>1 {t('week')}-1 {t('month')}</td>
                                <td className='font-weight-light text-end'>$ 100.00</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>6 {t('months')}</td>
                                <td className='font-weight-light  text-end'>$ 500.00</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>1 {t('year')}</td>
                                <td className='font-weight-light  text-end'>$ 900.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="btn btn-secondary" onClick={props.onClose} data-bs-dismiss="modal">{t("close")}</button>
                </div>
            </div>
        </div>
    </div>
}

export default PricingInfo;