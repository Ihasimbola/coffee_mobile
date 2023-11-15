import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TextInputTextInputEventData, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface IProps {
  inputValue: string
  setValue: (text: string) => void
}

const Input: React.FC<IProps> = ({ inputValue, setValue }) => {

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity style={styles.searchIcon}>
        <CustomIcon
        name="search" 
        color={inputValue?  COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
        size={25}
        />
      </TouchableOpacity>
      <TextInput 
        onChange={({ nativeEvent }) => setValue(nativeEvent.text)}
        value={inputValue}
        style={styles.input}
        placeholder='Find your Coffee'
        placeholderTextColor={COLORS.primaryLightGreyHex}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    backgroundColor: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium
  },
  input: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    width: "100%",
    height: 45,
    paddingLeft: 50,
    color: COLORS.primaryLightGreyHex,
    borderRadius: SPACING.space_15,

  },
  searchIcon: {
    position: "absolute",
    zIndex: 999,
    left: SPACING.space_12
  }
})

export default Input