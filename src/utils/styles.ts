import { StyleSheet } from "react-native";

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
    backgroundColor: '#fff',
  },
  input_text: {
    color: 'black'
  },
  button: {
    marginBottom: 10,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  header_bar: {
    height: 50,
    backgroundColor: 'white',
  },
  header_title: {
    color: 'black'
  },
  accents: {
    color: 'gray'
  },
  action_container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  action_body: {
    backgroundColor: '#219ebc',
    padding: 30,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  action_text: {
    color: '#ffffff',
    fontSize: 18,
  },
  card_body: {
    margin: 10,
    backgroundColor: 'white'
  },
  card_title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card_paragraph: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
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
    backgroundColor: 'white',
  },
})

export default styles
