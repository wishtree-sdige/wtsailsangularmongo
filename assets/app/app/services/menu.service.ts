import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  getMenu(): Array<any> {
    const menu = [
      { name: 'home', path: './home', children: [
        { 
          name: 'login', 
          path: './login'
        }
      ] },
      { 
        name: 'login', 
        path: './login'
      },
      { 
        name: 'register', 
        path: './register',
      },
      { 
        name: 'edit', 
        path: './edit'
      }
      
    ];

    return menu;
  }
}
