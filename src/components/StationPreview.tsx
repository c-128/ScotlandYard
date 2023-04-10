import { Station } from "../data/Station"

export default function StationPreview(props: { station: Station }) {

  return <>
    {props.station.number}
  </>
}