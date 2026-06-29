import { memo } from "react";
import { Path, Svg } from "react-native-svg";
import { useTheme } from "../../../contexts/ThemeContext";

type Props = {
  size?: number;
  color?: string;
};

function ArrowSmRightComponent({ size = 24, color }: Props) {
  const { colors } = useTheme();
  const strokeColor = color ?? colors.text;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 12H6M6 12L11 7M6 12L11 17"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const ArrowSmRight = memo(ArrowSmRightComponent);
