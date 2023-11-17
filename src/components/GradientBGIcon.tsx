import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcon from './CustomIcon'
import { COLORS, SPACING } from '../theme/theme'

type PropsType = {
  iconName: string,
  size: number,
  color: string
}

const GradientBGIcon: React.FC<PropsType> = ({ iconName, size, color }) => {

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[ COLORS.primaryGreyHex, COLORS.primaryBlackHex ]}
        style={styles.linearGradient}
      >
        <CustomIcon name={iconName} size={size} color={color} />
      </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  linearGradient: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    justifyContent: "center",
    alignItems: "center"
  }
})
  

export default GradientBGIcon