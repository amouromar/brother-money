import { memo } from "react";
import { Svg, Path, Circle } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

function ProfileComponent({ size = 24, color = "#1C274C" }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21C20 18.7909 16.4183 17 12 17C7.58172 17 4 18.7909 4 21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="7"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const Profile = memo(ProfileComponent);
