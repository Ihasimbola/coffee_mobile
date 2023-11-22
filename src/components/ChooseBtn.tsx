import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import { SizeTypes } from '../types/Size';

type PropsType = {
  text: string,
  active?: boolean,
  setSize: (size: SizeTypes) => void,
  id: SizeTypes,
  style?: any
}

const ChooseBtn: React.FC<PropsType> = ({ text, active , setSize, id, style }) => {
  return (
    <Pressable
     style={[
      styles.container, 
      active? styles.active : null, 
      style? style : null,
      {
        width: style?.width? style.width : 90
      } 
    ]}
     onPress={() => setSize(id)}
    >
      <Text style={styles.textColor}>{ text }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_8,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0)",
    padding: SPACING.space_12,
    // minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  textColor: {
    color: COLORS.secondaryLightGreyHex
  },
  active: {
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 2
  }
})

export default ChooseBtn