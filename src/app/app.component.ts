import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MenuService } from './services/menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shell | Wishtree';
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  supportLanguages =['en','fr','es','ar'];
  constructor(private titleService: Title, private metaService: Meta,private _router: Router, private menuService: MenuService, private translateService:TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang);
    
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.menu = this.menuService.getMenu();
    this.listenRouting();
  }

 
 listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
      
        target = this.menu;
        this.breadcrumbList.length = 0;
       
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
         
          target = target.find(page => page.path.slice(2) === router);
         
          this.breadcrumbList.push({
            name: target.name,
          
            path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`
          });
          
          if (index+1 !== routerList.length) {
            target = target.children;
          }
        });
      }
    });
  }

}
