import { Component, OnInit } from '@angular/core';

interface Grid {
  [x: string]: Array<number>;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  gridX: number = 8;
  gridY: number = 8;
  gridObject: Grid = {};
  grid: Array<string>;
  explored = { 1: [2, 3, 5] };
  probes = { "1": { "5": { direction: 90 } } };

  constructor() {
    this.mountGrid();
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
  mountGrid(): void {
    for (let x = 0; x < this.gridX + 1; x++) {
      this.gridObject[x] = [];

      for (let y = 0; y < this.gridY + 1; y++) {
        this.gridObject[x].push(y);
      }
    }
    this.grid = Object.keys(this.gridObject).reverse();
  }

}