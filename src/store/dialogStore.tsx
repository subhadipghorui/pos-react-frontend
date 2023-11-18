import { observable, action, makeObservable } from 'mobx';
import { IRootStore } from './rootStore';

export default class DialogStore {
  isDialogOpen = false;
  dialogText = "Are you sure ?";
  private confirmFn: any = null;
  private rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    console.log("DialogStore")
    makeObservable(this, {
        isDialogOpen: observable,
        openDialog: action,
        closeDialog: action,
        confirmAction: action,
    });
    // Access all the store via root store
    this.rootStore = rootStore;
  }

  openDialog = (data: any) => {
    this.confirmFn = data.confirmFn;
    this.dialogText = data.dialogText;
    this.isDialogOpen = true;
  }
  
  closeDialog = () => {
    this.confirmFn = null;
    this.dialogText = "Are you sure ?";
    this.isDialogOpen = false;
  }
  
  confirmAction = () => {
    if (this.confirmFn) this.confirmFn();
    this.closeDialog();
  }
}
