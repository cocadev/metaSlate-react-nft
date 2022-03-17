import { PolygonLogo } from "../menu/logos";

export const PriceUnit = (props) => {
  const {token, price} = props;
  return(
      <div>
          <PolygonLogo /> {price} {''}{token}
      </div>
  )
}