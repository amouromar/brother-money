import { memo } from "react";
import { Svg, Path, Circle } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

function SearchComponent({ size = 24, color = "#1C274C" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="11"
        cy="11"
        r="8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 21L16.65 16.65"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const Search = memo(SearchComponent);
