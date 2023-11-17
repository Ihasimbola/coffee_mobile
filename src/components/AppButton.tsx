import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon'
import { SPACING } from '../theme/theme'

type PropsType = {
  text: string,
  textColor: string,
  iconName: string,
  iconSize: number,
  iconColor: string,
  bgColor: string
}

const AppButton: React.FC<Partial<PropsType>> = ({ text, iconName, iconSize, iconColor, bgColor, textColor }) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: bgColor,
      ...styles.container
    }}>
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
    borderRadius: SPACING.space_12,
    alignItems: "center",
    padding: SPACING.space_12
  }
})

export default AppButton