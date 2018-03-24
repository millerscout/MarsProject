import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MarsService } from './../services/MarsService'

interface Grid {
  [x: string]: Array<number>;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  world: MarsService.World[]
  gridObject: Grid = {};
  grid: Array<string>;
  explored = { 1: [2, 3, 5] };
  probes = { "1": { "5": { direction: 90 } } };
  service: MarsService.Client;
  constructor(private http: HttpClient) {
    let base = "http://localhost:54988";
    this.service = new MarsService.Client(http, base);
    this.fetchData();
  }

  ngOnInit() {

  }

  hasProbe(x: number, y: number): boolean {
    if (this.probes[x] && this.probes[x][y])
      return true;
    return false;
  }

  getExplored(x: number, y: number) {
    if (this.explored[x] && this.explored[x].indexOf(y) > -1)
      return "explored"
    return "unexplored"
  }
  getRotation(x: number, y: number) {
    if (this.probes[x] && this.probes[x][y])
      return `rotate(${this.probes[x][y].direction}deg)`
    return "0";
    // return `transform: rotate(${number}deg);
    // -webkit-transform: rotate(${number}deg);
    // -moz-transform: rotate(${number}deg);
    // -o-transform: rotate(${number}deg);
    // -ms-transform: rotate(${number}deg);`
  }
  fetchData() {
    let list = this.service.apiMarsGet();

    list.subscribe(data => {
      this.world = data
      this.mountGrid();
    });
  }
  mountGrid(): void {

    if (this.world.length > 0) {
      var current = this.world[0]
      for (let x = 0; x < parseInt(current.grid.x) + 1; x++) {
        this.gridObject[x] = [];

        for (let y = 0; y < parseInt(current.grid.y) + 1; y++) {
          this.gridObject[x].push(y);
        }
      }
      this.grid = Object.keys(this.gridObject).reverse();
    }
  }
}
