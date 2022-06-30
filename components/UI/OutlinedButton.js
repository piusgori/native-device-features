import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const OutlinedButton = ({ onPress, icon, children, }) => {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} color={Colors.primary500}></Ionicons>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,
    },
    icon: {
        marginRight: 6,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: Colors.primary500
    }
})