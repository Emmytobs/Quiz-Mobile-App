import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "~/lib/useColorScheme";

export default function CameraIcon(props) {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke={isDarkColorScheme ? "#7a7a7a" : "#303037"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 21H7a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4h.5l.67-1.34A3 3 0 0 1 10.85 3h2.3a3 3 0 0 1 2.68 1.66L16.5 6h.5a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4Z"
      />
      <Path
        stroke={isDarkColorScheme ? "#7a7a7a" : "#303037"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 9.5h.01"
      />
    </Svg>
  );
}
