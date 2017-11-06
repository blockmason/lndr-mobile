import {
    StyleSheet
} from 'react-native'

const verticalMargins = {
  marginTop: 10,
  marginBottom: 10
}

const centered = {
  alignSelf: 'center'
}

const defaultFontSize = {
  fontSize: 16
}

export default StyleSheet.create({
  dialog: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },

  dialog_item: {
    ...verticalMargins
  },

  text_input: {
    ...verticalMargins,
    ...defaultFontSize
  },

  text_area: {
    ...verticalMargins,
    ...defaultFontSize,
    minHeight: 60
  },

  dialog_text: {
    ...centered,
    fontSize: 20,
    padding: 10
  },

  section_title: {
    ...verticalMargins,
    ...centered,
    fontSize: 20,
    fontWeight: 'bold'
  },

  section_subtitle: {
    ...verticalMargins,
    ...centered
  },

  record_words: {
    ...verticalMargins,
    ...defaultFontSize,
    alignSelf: 'stretch',
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red'
  },

  dialog_button: {
    ...verticalMargins,
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1
  },

  dialog_text: {
    ...centered,
    ...defaultFontSize,
    fontWeight: 'bold',
    color: '#03A9F4'
  },

  dialog_text_danger: {
    ...centered,
    ...defaultFontSize,
    fontWeight: 'bold',
    color: '#F40309'
  },

  dialog_button_alt: {
    ...verticalMargins,
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: '#FFF'
  },

  dialog_text_alt: {
    ...centered,
    fontWeight: 'bold',
    color: 'gray'
  }
})
