import { StyleSheet } from "react-native";
import { Platform } from "react-native";

const palette = {
  primary: "#d0bcff",
  primary_variant: "#e4c1f9",
  secondary: "#219ebc",
  secondary_variant: "#00b4d8",
  background: "#ffffff",
  background_variant: "#fff",
  surface: "#edf6f9",
  error: "#fc0b77",
  success: "#80ed99",
  on_primary: "#ffffff",
  on_secondary: "#ffffff",
  on_background: "#000000",
  on_surface: "#343a40",
  on_error: "#ffffff",
  on_success: "#ffffff"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  title_card: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: palette.background_variant,
  },
  input_text: {
    color: palette.on_background
  },
  button: Platform.OS === "ios" ? {
    marginBottom: 10,
    width: 700,
    minWidth: '100%',
    alignSelf: 'center',
  }: {
    marginBottom: 10,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  header_bar: {
    height: 50,
    backgroundColor: palette.background,
  },
  header_title: {
    color: palette.on_background
  },
  accents: {
    color: palette.on_surface
  },
  action_container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  action_body: {
    backgroundColor: palette.secondary,
    padding: 30,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  action_text: {
    color: palette.on_secondary,
    fontSize: 18,
  },
  card_body: {
    margin: 10,
    backgroundColor: palette.background
  },
  card_title: {
    fontSize: 24,
    color: palette.on_background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card_paragraph: {
    fontSize: 18,
    color: palette.on_background,
    textAlign: 'center',
    marginBottom: 10,
  },
  card_caption: {
    color: palette.on_background,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  card_line: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  card_label: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 10,
    color: palette.on_background,
  },
  card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  card_comments: {
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  search_body: {
    width: '100%',
    padding: 10,
    paddingTop: 30,
  },
  search_input: {
    width: '100%',
    backgroundColor: palette.background_variant,
  },
})

export default styles
