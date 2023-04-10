import { Connection } from "../data/Connection";
import { Station } from "../data/Station";

export class Graph {

  readonly connections: Connection[];
  readonly stations: Station[];

  constructor(connections: Connection[], stations: Station[]) {
    this.connections = connections;
    this.stations = stations;
  }

  getStationByNumber(number: number): Station | undefined {
    for (const station of this.stations)
      if (station.number == number) return station;
  }

  getStationNeighbours(parent: number): Station[] {
    return this.connections
      .filter(con => {
        return con.from == parent || con.to == parent;
      })
      .map(con => {
        if (con.from == parent) return this.getStationByNumber(con.to)!;
        else return this.getStationByNumber(con.from)!;
      });
  }
}