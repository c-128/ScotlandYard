import { Show } from "solid-js"
import { TravelMethod } from "../data/TravelMethod"

export default function StationMethods(props: { methods: TravelMethod[] }) {

  return <>
    <Show when={props.methods.includes(TravelMethod.TAXI)}>
      <span class="material-symbols-outlined">directions_car</span>
    </Show>
    <Show when={props.methods.includes(TravelMethod.BUS)}>
      <span class="material-symbols-outlined">directions_bus</span>
    </Show>
    <Show when={props.methods.includes(TravelMethod.UNDERGROUND)}>
      <span class="material-symbols-outlined">directions_subway</span>
    </Show>
    <Show when={props.methods.includes(TravelMethod.WATER)}>
      <span class="material-symbols-outlined">directions_boat</span>
    </Show>
  </>
}