import { Component, OnInit, Injectable, NgProbeToken } from '@angular/core';
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
  step: number = 0;
  world: MarsService.World
  gridObject: Grid = {};
  grid: Array<string>;
  explored = { 1: [2, 3, 5] };
  probes = {};
  service: MarsService.Client;
  missionType = "newMission";
  selectedProbe: MarsService.IProbe
  constructor(private http: HttpClient) {
    let base = "http://localhost:54988";
    this.service = new MarsService.Client(http, base);
    // this.fetchData();
  }

  ngOnInit() {

  }
  confirmGrid(x, y) {
    let grid = new MarsService.Grid({ x: x, y: y });
    let list = this.service.apiMarsPost(grid);

    list.subscribe(world => {
      this.world = world;
      this.mountGrid();
    })
  }
  setProbe(id) {
    this.selectedProbe = this.world.commandCenter.probes.map(q => { if (q.publicId == id) return q; })[0];
  }
  addProbe(x, y, direction) {
    var c = this.service.apiCommandCenterAddProbeByWorldIdPost(this.world.publicId, new MarsService.Position({ x, y, direction }));

    c.subscribe((hq) => {
      this.world.commandCenter = hq
    })

  }
  getCommands() {
    return this.selectedProbe.commands.map((q) => { return q == 0 ? 'L' : q == 1 ? 'M' : 'R' }).join('')
  }
  addCommand(command) {
    let probe = this.selectedProbe
    if (probe.commands == null) { probe.commands = [command] } else {
      probe.commands.push(command);
    }
  }
  saveWorld() {
    this.service.apiCommandCenterSaveCommandsByWorldIdPut(this.world.publicId, this.world.commandCenter).subscribe();
  }
  loadGrid(uniqueId) {
    // 69d7ef22-878e-4509-8fab-f4ef0c8f1c5f
    let list = this.service.apiMarsByIdGet(uniqueId);

    list.subscribe(world => {
      this.world = world
      this.mountGrid();
    });
  }
  playActions() {
    var turns = this.world.commandCenter.probes.map((r) => { return r.commands.length }).reduce((a, b) => a + b, 0);

    if (turns > 0) {
      let list = this.service.apiCommandCenterMoveProbesPost(this.world.commandCenter).subscribe(q => {
        this.world.commandCenter = q;
        this.mountProbes();
        setTimeout(() => {
          this.playActions()
        }, 1000);

      });
    }

  }
  setMission(type) {
    this.missionType = type ? 'newMission' : 'previousMission'
  }
  setPhase(phase) {
    this.step = phase;
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
  mountProbes() {
    this.probes = {};
    this.world.commandCenter.probes.forEach(probe => {
      let direction = 90
      if (probe.currentPosition.direction == 1) direction = 180;
      if (probe.currentPosition.direction == 2) direction = -90;
      if (probe.currentPosition.direction == 3) direction = 0;
      this.probes[probe.currentPosition.x] = {}
      this.probes[probe.currentPosition.x][probe.currentPosition.y] = { direction: direction }
    });
  }
  mountGrid(): void {
    this.setPhase(2);
    for (let x = 0; x < this.world.grid.x + 1; x++) {
      this.gridObject[x] = [];

      for (let y = 0; y < this.world.grid.y + 1; y++) {
        this.gridObject[x].push(y);
      }
    }
    this.grid = Object.keys(this.gridObject).reverse();
    this.mountProbes();
  }
}
