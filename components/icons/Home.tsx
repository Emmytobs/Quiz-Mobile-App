import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "~/lib/useColorScheme";

export default function HomeIcon(props) {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        fill={
          props.focused ? "#EF9303" : isDarkColorScheme ? "#242424" : "#E8E8E8"
        }
        fillRule="evenodd"
        d="m22.362 11.654-.633 7.595A3 3 0 0 1 18.739 22H6.26a3 3 0 0 1-2.989-2.75l-.633-7.596a3 3 0 0 1 1.19-2.65L10.7 3.85a3 3 0 0 1 3.6 0l6.872 5.154a3 3 0 0 1 1.19 2.65ZM10.5 20.5l-.293-3.509a2.3 2.3 0 1 1 4.585 0L14.5 20.5h-4Z"
        clipRule="evenodd"
        strokeWidth={2}
      />
    </Svg>
  );
}
