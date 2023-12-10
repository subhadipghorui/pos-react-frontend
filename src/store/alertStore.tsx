import { observable, action, makeObservable } from 'mobx';
import { IRootStore } from './rootStore';
import { AlertColor } from '@mui/material';


interface AlertData {
    status: AlertColor,
    message: string,
    data?: any,
}

export default class AlertStore {
    isAletOpen = false;
    alertData: AlertData | null = { status: 'error', message: 'This is a error', data: [] };
    private rootStore: IRootStore;

    constructor(rootStore: IRootStore) {
        console.log("DialogStore")
        makeObservable(this, {
            isAletOpen: observable,
            alertData: observable,
            open: action,
            close: action,
        });
        // Access all the store via root store
        this.rootStore = rootStore;
    }

    open = (data: AlertData) => {
        this.alertData = data;
        this.isAletOpen = true;
    }

    close = () => {
        this.alertData = null;
        this.isAletOpen = false;
    }
}
