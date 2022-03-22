import {observable, computed, runInAction, action, makeObservable} from 'mobx';
import moment from "moment";

export interface GameEvent {
    id: string;
    name: string;
    picture: string;
    createdOn: Date;
    region: string;
}

export type EventType = "upcoming"|"past"|"live";
export class DashBoardStore {
    @observable
    private _events:Array<GameEvent> = [];
    @observable
    private _eventTypeFilter: EventType = "past";
    constructor() {
        this.load();
        makeObservable(this);
    }
    @action
    load() {
        return fetch("/data.json").then(res => res.json()).then((res: Array<GameEvent>) => {
           return res.map((event) => {
                event.createdOn = new Date(event.createdOn);
                return event;
            })
        }).then(events => {
            runInAction(() => {
                this._events =events;
            })
        })
    }

    @computed
    get events():Array<GameEvent> {
        const today = new Date();
        today.setHours(0)
        return this._events.filter(event => {
            if(this._eventTypeFilter == 'live')
                return moment(event.createdOn).isSame(new Date(), "day");
            if(this._eventTypeFilter == "past")
                return moment(event.createdOn).isBefore(new Date(),"day");
            if(this._eventTypeFilter == "upcoming")
                return moment(event.createdOn).isAfter(new Date(),"day");
        });
    }

    @computed
    get filter() {
        return this._eventTypeFilter;
    }

    @action
    setFilter(filter: EventType) {
        this._eventTypeFilter = filter;
    }

    @action
    updaetSchedule(event: GameEvent, date: Date) {
        let _event:GameEvent = {...event, createdOn: date};
        this._events = this._events.map(event => event.id == _event.id ? _event: event);
    }


}