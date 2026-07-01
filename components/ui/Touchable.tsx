import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface TouchableProps extends TouchableOpacityProps {
  hitSlop?: { top?: number; bottom?: number; left?: number; right?: number };
}

const DEFAULT_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

export function Touchable({
  hitSlop = DEFAULT_HIT_SLOP,
  ...props
}: TouchableProps) {
  return <TouchableOpacity hitSlop={hitSlop} {...props} />;
}
