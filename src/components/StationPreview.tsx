import { Show } from "solid-js"
import { Station } from "../data/Station"
import { TravelMethod } from "../data/TravelMethod"
import StationMethods from "./StationMethods"

export default function StationPreview(props: { station: Station, methods?: boolean }) {

  return <>
    <Show when={props.methods}>
      <StationMethods methods={props.station.methods} />
    </Show>

    <span>{props.station.number}</span>
  </>
}