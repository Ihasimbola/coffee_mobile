import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/app_images/avatar.png')}
        style={styles.image}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    height: SPACING.space_36,
    width: SPACING.space_36,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  image: {
    height: SPACING.space_36,
    width: SPACING.space_36
  }
})

export default ProfilePic;