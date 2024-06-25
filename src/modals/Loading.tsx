import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../contasts/fontFamilies'

interface Props {
  visible: boolean
  title?: string
}

const Loading = (props: Props) => {
  const { title, visible } = props
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="none"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator color={'#ffffff'} size={32} />
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    marginTop: 10,
    fontFamily:fontFamilies.semiBold
  },
})

export default Loading
