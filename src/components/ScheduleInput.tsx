import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameEvent } from '../stores/dashboardStore';

const ScheduleInput: React.FC<{ open: boolean, onClose: () => void, event: GameEvent|null , onChange:(date: Date) =>void}> = (props) => {
    const {t} = useTranslation("app");
    const inputRef = useRef<any>(null);
    const [date, setdate] = useState(props.event?.createdOn);


    useEffect(() => {
        setdate(props.event?.createdOn);
    }, [props.event?.createdOn])

    const handleClose = () => {
        props.onClose();
    }

    const handleUpdate = () => {
        if(date)
        props.onChange(date);
        props.onClose();
   
    }
    return <div className={props.open ? "modal fade show":"modal"} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
              <h4>{t("scheduleAgain")}</h4>
              <div className="d-flex mb-2">
                        <img src={props.event?.picture} className="me-2" style={{ height: 80, width: 80 }}></img>
                        <div className="d-flex flex-column align-self-end">
                            <span className='font-weight-bold'>{props.event?.name}</span>
                            <span className='font-weight-light'>{props.event?.region}</span>
                        </div>
                    </div>

                    <input onChange={event => {setdate(moment(event.target.value).toDate())}} ref={inputRef} type="date" value={moment(date).format("YYYY-MM-DD")}></input>
                <div className="modal-footer justify-content-center">
                    
                <button type="button" className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">{t("update")}</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">{t('close')}</button>
                </div>
              </div>
            </div>
        </div>
    </div>
}

export default observer(ScheduleInput);