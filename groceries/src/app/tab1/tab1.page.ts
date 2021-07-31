import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { GroceriesServiceService } from '.././groceries-service.service';
import { InputDialogServiceService } from '.././input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery List";

  constructor(public toastController: ToastController, 
              public alertController: AlertController, 
              public dataService: GroceriesServiceService, 
              public inputDialogService: InputDialogServiceService,
              private socialSharing: SocialSharing) {};

  loadItems(){
    return this.dataService.getItems();
  };

  async editItem(item, index) {
    console.log("Editing Item - ", item, index);

    const toast = await this.toastController.create({
      message: 'Editing Item - ' + item.name,
      duration: 2000
    });
    toast.present();

    this.inputDialogService.showPrompt(item, index);
  };

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);

    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name,
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(index);
  };

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);

    const toast = await this.toastController.create({
      message: 'Sharing Item - ' + item.name,
      duration: 2000
    });
    toast.present();

    let message = "Gocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Grocery List app";

    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared successfully!")
    }).catch((error) => {
      console.error("Error while sharing.", error)
    });
  };

  async addItem() {
    console.log("Adding Item");
    
    this.inputDialogService.showPrompt();
  };

  
}
