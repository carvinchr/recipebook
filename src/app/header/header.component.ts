import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  
  constructor(private dataStorageservice: DataStorageService){}

  ngOnInit(){
    this.dataStorageservice.FetchRecipes().subscribe();
  }

  onSaveData()
  {
    this.dataStorageservice.storeRecipes();
    console.log("from header-compo")
  }
  onFetchData(){

    this.dataStorageservice.FetchRecipes();
    console.log("from header-compo")

  }

}


