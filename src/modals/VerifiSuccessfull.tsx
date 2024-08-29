import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../contasts/fontFamilies'
import { ButtonComponent, SpaceComponent, TextComponent } from '../components'
import { Verify } from 'iconsax-react-native'
import { appInfo } from '../contasts/appInfo'

interface Props {
    visible: boolean
    title?: string
    onPressLogin: () => void;

}

const Loading = (props: Props) => {
    const { title, visible, onPressLogin } = props
    return (
        <Modal
            transparent
            statusBarTranslucent
            visible={visible}
            animationType="none"
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <TextComponent
                        text='Xác thực thành công password sẽ được gửi về email của bạn !'
                        color='black'
                        flex={0}
                        bold
                    />
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.02} />
                    <Verify size="40" color="#FF8A65" variant="Broken" />
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.02} />
                    <ButtonComponent
                        onPress={onPressLogin}
                        text={'Login'}
                        type={'primary'}
                        color='white'
                        styles={{
                            marginHorizontal: appInfo.sizes.WIDTH * 0.07
                        }}
                    />
                    <SpaceComponent height={appInfo.sizes.HEIGHT * 0.01} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white', // Đặt màu nền cho nội dung
        padding: 20,
        width: 300,
        borderRadius: 10,
        alignItems: 'center',
        flexShrink: 1,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        marginTop: 10,
        fontFamily: fontFamilies.semiBold
    },
})

export default Loading
