import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "~/lib/useColorScheme";

export default function SettingsIcon(props) {
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
        fill={
          props.focused ? "#EF9303" : isDarkColorScheme ? "#242424" : "#E8E8E8"
        }
        fillRule="evenodd"
        d="M9.11 2h5.78a4.998 4.998 0 0 1 4.324 2.499V4.5l2.38 4.111a6.791 6.791 0 0 1 0 6.778l-.001.002-2.379 4.109A5 5 0 0 1 14.89 22H9.11a4.998 4.998 0 0 1-4.324-2.5l-2.379-4.12a6.754 6.754 0 0 1 0-6.76l2.38-4.12A5 5 0 0 1 9.11 2Zm.002 2a2.998 2.998 0 0 0-2.594 1.5L4.14 9.62a4.754 4.754 0 0 0 0 4.76l2.38 4.12A3.001 3.001 0 0 0 9.111 20h5.776a2.998 2.998 0 0 0 2.594-1.5V18.5l2.379-4.108a4.793 4.793 0 0 0 0-4.782l-2.378-4.108V5.5A3 3 0 0 0 14.888 4H9.112Z"
        clipRule="evenodd"
      />
      <Path
        fill={
          props.focused ? "#EF9303" : isDarkColorScheme ? "#242424" : "#E8E8E8"
        }
        fillRule="evenodd"
        d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
