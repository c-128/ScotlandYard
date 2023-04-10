import { batch, createSignal, For, Show } from "solid-js";
import { Graph } from "../algorithm/Graph";
import { PathFinder as PathFinderAlgorithm } from "../algorithm/pathfinder/PathFinder";
import { Connections } from "../data/Connection";
import { getStationByNumber, Stations } from "../data/Station";
import { TravelMethod } from "../data/TravelMethod";
import StationMethods from "./StationMethods";
import StationPreview from "./StationPreview";

export default function PathFinder() {

  const [avoidWater, setAvoidWater] = createSignal<boolean>(true);
  const [avoidUnderground, setAvoidUnderground] = createSignal<boolean>(false);
  const [avoidBus, setAvoidBus] = createSignal<boolean>(false);
  const [avoidTaxi, setAvoidTaxi] = createSignal<boolean>(false);

  const [from, setFrom] = createSignal<number>(0);
  const [to, setTo] = createSignal<number>(0);

  const [path, setPath] = createSignal<number[]>([]);
  const [time, setTime] = createSignal<number>(0);

  async function findPath() {
    let connections = Connections;
    if (avoidWater()) connections = connections.filter(c => c.method != TravelMethod.WATER);
    if (avoidUnderground()) connections = connections.filter(c => c.method != TravelMethod.UNDERGROUND);
    if (avoidBus()) connections = connections.filter(c => c.method != TravelMethod.BUS);
    if (avoidTaxi()) connections = connections.filter(c => c.method != TravelMethod.TAXI);

    const startTime = Date.now();
    const finder = new PathFinderAlgorithm(new Graph(connections, Stations));
    const solution = finder.findShortestPath(from(), to());
    batch(() => {
      setPath(solution);
      setTime(Date.now() - startTime);
    });
  }

  return <>
    <div>
      <div class="grid">
        <label>
          <input type="checkbox" onChange={e => setAvoidWater(e.currentTarget.checked)} checked={avoidWater()} />
          Avoid boats
        </label>

        <label>
          <input type="checkbox" onChange={e => setAvoidUnderground(e.currentTarget.checked)} checked={avoidUnderground()} />
          Avoid underground
        </label>

        <label>
          <input type="checkbox" onChange={e => setAvoidBus(e.currentTarget.checked)} checked={avoidBus()} />
          Avoid bus
        </label>

        <label>
          <input type="checkbox" onChange={e => setAvoidTaxi(e.currentTarget.checked)} checked={avoidTaxi()} />
          Avoid taxi
        </label>
      </div>

      <div class="grid">
        <label>
          From
          <input type="number" onChange={e => setFrom(e.currentTarget.valueAsNumber)} value={from()} />
        </label>

        <label>
          To
          <input type="number" onChange={e => setTo(e.currentTarget.valueAsNumber)} value={to()} />
        </label>
      </div>

      <button onClick={findPath}>Find path</button>

      <Show when={path().length != 0}>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Station</th>
              <th scope="col">Station Methods</th>
            </tr>
          </thead>
          <tbody>
            <For each={path()}>
              {(segment, i) => <tr>
                <th>{i() + 1}</th>
                <th>{segment}</th>
                <th>
                  <StationMethods methods={getStationByNumber(segment).methods} />
                </th>
              </tr>}
            </For>
          </tbody>
        </table>

        <span>Time to solve: {time()}ms</span>
      </Show>
      <Show when={path().length == 0}>
        <span>Please enter a valid starting and ending point or no path found!</span>
      </Show>
    </div>
  </>
}