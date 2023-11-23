import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'
import { BORDERRADIUS, SPACING } from '../theme/theme'

type PropsType = {
  text: string,
  textColor: string,
  iconName: string,
  iconSize: number,
  iconColor: string,
  bgColor: string,
  onPress: any
}

const AppButton: React.FC<Partial<PropsType>> = ({ text, iconName, iconSize, iconColor, bgColor, textColor, onPress }) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: bgColor,
      ...styles.container
    }}
      onPress={onPress}
    >
      {
        text && <Text style={{
          color: textColor
        }}>
          { text }
        </Text>
      }
      {
        iconName && <CustomIcon name={iconName} size={iconSize} color={iconColor} />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDERRADIUS.radius_8,
    alignItems: "center",
    padding: SPACING.space_12
  }
})

export default AppButton