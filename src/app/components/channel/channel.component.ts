import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //messages:Message[]
  channel_id: String;
  navigationSubscription: any;
  constructor(
    private channelService: ChannelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe(param => {
      this.channel_id = param.id;
      console.log(this.channel_id);
    });
  }

  ngOnInit() {//nn funziona bene

    /* this.route.params.subscribe(params => {
      console.log('parent params ', params);
    }); */
    //this.channelService.getAllMessages()
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll

      // if (messages.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnDestroy() {
    //this.navigationSubscription.unsubscribe();
  }

}
