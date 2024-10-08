import { api } from "@src/screens/Authenticate/Login";
import { AxiosError } from "axios";
import { Alert, Platform } from "react-native";

export const fixAlert = (title: string, text: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n${text}`)
  } else {
    fixAlert(title, text)
  }
}

interface Props {
  item: any;
  setMode: any;
  catchMethod: (err: AxiosError) => void;

  title: string;
  text: string;
  apiPath: string;
}


export const deleteAlert = ({item, setMode, catchMethod, title, text, apiPath}: Props) => {
  const onPositivePress = () => {
    api.delete(apiPath + item.id)
      .then(_ => {
        setMode('view');
      })
      .catch(err => catchMethod(err))
  }
  if (Platform.OS === 'web') {
    const res = window.confirm(
      `${title}\n${text}`
    )
    if (res) onPositivePress()
    else alert("Action cancled")
  } else {
    Alert.alert(
      title,
      text,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes", onPress: onPositivePress
        }
      ]
    );
  }
}
