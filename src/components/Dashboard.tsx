import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStorecontext';
import moment from 'moment';
import { EventType, GameEvent } from '../stores/dashboardStore';
import PricingInfo from './PricingInfo';
import ScheduleInput from './ScheduleInput';

function getTimeDiff(date: Date) {
  var days =  moment(date).diff(new Date(),'day');
  return days;
//   if(days == 0)
//     return 'today'
//   if(days < 0)
//     return `${-1*days} days ago`
//   else
//   return `After ${days} days`
}
const Dashboard: React.FC = () => {
    const { t } = useTranslation("app");
    // const [activeTab, setactiveTab] = useState<"upcoming" | "past" | "live">("upcoming");
    const { dashboard } = useContext(RootStoreContext)
    const { events, filter: activeTab , updaetSchedule} = dashboard;
    const [selectedEvent, setselectedEvent] = useState<GameEvent| null>(null);
    const [openPricingInfo, setopenPricingInfo] = useState(false);
    const [openScheduleInput, setopenScheduleInput] = useState(false)
    const handleSelection= (event: GameEvent) => {
        
        setselectedEvent(event);
        setopenPricingInfo(true);
    }

    const handleReschdulen= (event: GameEvent) => {
        
        setselectedEvent(event);
        setopenScheduleInput(true);
    }
    const handleTabChange = (type: EventType) => {
        dashboard.setFilter(type);
    }

    const handleScheduleChange = (date:Date) => {
        if(selectedEvent)
            dashboard.updaetSchedule(selectedEvent, date);
    }
    return <div className='d-flex flex-column'>
        <div className="d-flex">
            <div onClick={() => handleTabChange("upcoming")} className={activeTab == 'upcoming' ? "app-tabs active" : "app-tabs"}>{t("eventType.upcoming")}</div>
            <div onClick={() => handleTabChange("live")} className={activeTab == 'live' ? "app-tabs active" : "app-tabs"}>{t("eventType.live")}</div>
            <div onClick={() => handleTabChange("past")} className={activeTab == 'past' ? "app-tabs active" : "app-tabs"}>{t("eventType.past")}</div>
        </div>
        <div className="d-flex table-responsive">
            <table className='table table-border'>
                <thead>
                    <tr>
                        <th>{t("date")}</th>
                        <th>{t("campaign")}</th>
                        <th>{t("view")}</th>
                        <th>{t("actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => {
                        const diff = getTimeDiff(event.createdOn);
                        return <tr key={event.id}>
                        <td>
                            <h5>
                            {moment(event.createdOn).format("MMM YYYY, DD")}
                            </h5>
                            <span className="font-weight-light">
                                {diff > 0 && t('afterdays', {days: diff})}
                                {diff < 0 && t('daysAgo', {days: -1*diff})}
                                {diff == 0 && t('today', {days: diff})}
                            </span>
                        </td>
                        <td>
                            <div className="d-flex">
                                <img src={event.picture} width="30" height="30" className="m-1"></img>
                                <div className="d-flex flex-column">
                                    <span className='font-weight-bold'>{event.name}</span>
                                    <span className='font-weight-light'>{event.region}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <button className="btn icon-btn text-primary" onClick={() => handleSelection(event)}>
                                <img src="price.png" />
                                {t("viewPricing")}
                            </button>
                        </td>
                        <td>
                            <div className="actions">
                                <button className="btn icon-btn text-primary">
                                    <img src="file.png" />
                                    {t("CSV")}
                                </button>
                                <button className="btn icon-btn text-primary">
                                    <img src="statistics-report.png" />
                                    {t("report")}
                                </button>
                                <button className="btn icon-btn text-primary" onClick={() => handleReschdulen(event)}>
                                    <img src="calendar.png" />
                                    {t("scheduleAgain")}
                                </button>
                            </div>
                        </td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>

        <PricingInfo open={openPricingInfo} onClose={() => setopenPricingInfo(false)} event={selectedEvent}/>
        <ScheduleInput open={openScheduleInput} onClose={() => setopenScheduleInput(false)} event={selectedEvent} onChange={handleScheduleChange}/>

    </div>
}

export default observer(Dashboard);