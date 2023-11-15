import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'
import { COLORS, SPACING } from '../theme/theme'

type PrpsType = {
  iconName?: string,
  size?: number,
  color?: string
  text?: string | undefined
}

const IconDetails: React.FC<PrpsType> = ({ iconName, size, color, text }) => {

  return (
    <View style={styles.container}>
      { iconName && <CustomIcon name={iconName} size={size} color={color} /> }
      <Text style={styles.text}>{ text }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SPACING.space_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: SPACING.space_10,
    minWidth: 55
  },
  text: {
    color: COLORS.primaryLightGreyHex
  }
})
export default IconDetails