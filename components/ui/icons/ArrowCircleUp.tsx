import { memo } from "react";
import { Svg, Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

function ArrowCircleUpComponent({ size = 24, color = "#000000" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const ArrowCircleUp = memo(ArrowCircleUpComponent);
