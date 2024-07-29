import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import { Text } from '~/components/ui/text';

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 13,
        fontWeight: 400
      }}
      text2Style={{
        fontSize: 15
      }}
      text1Props={{
        numberOfLines: 2
      }}
    />
  ),
  // /*
  //   Or create a completely new type - `tomatoToast`,
  //   building the layout from scratch.

  //   I can consume any custom `props` I want.
  //   They will be passed when calling the `show` method (see below)
  // */
  // tomatoToast: ({ text1 }: any) => (
  //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     {/* <Text>{props.uuid}</Text> */}
  //   </View>
  // )
};


export default toastConfig;