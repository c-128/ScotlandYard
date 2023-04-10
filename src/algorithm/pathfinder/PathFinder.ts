import { Connection } from "../../data/Connection";
import { Station, Stations } from "../../data/Station";
import { Graph } from "../Graph";

export class PathFinder {

  readonly graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  findShortestPath(from: number, to: number): number[] {
    const queue: number[] = [from];
    const visited: number[] = [];
    const parents: { [id: number]: number } = {};

    while (queue.length > 0) {
      const station = queue.shift()!;

      if (station == to) {
        const stations: number[] = [];
        let recursive = to;
        while (recursive != from) {
          stations.unshift(recursive);
          recursive = parents[recursive];
        }
        stations.unshift(from);
        return stations;
      } else {
        for (const neighbour of this.graph.getStationNeighbours(station).filter(station => !visited.includes(station.number))) {
          visited.push(neighbour.number);
          parents[neighbour.number] = station;
          queue.push(neighbour.number);
        }
      }
    }

    return [];
  }
}
