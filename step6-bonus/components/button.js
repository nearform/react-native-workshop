import { Pressable, StyleSheet, Text } from 'react-native'

export const Button = ({ children, primary = false, ...pressableProps }) => (
  <Pressable
    style={[styles.button, primary && styles.primary, ({ pressed }) => pressed && styles.pressed]}
    accessibilityRole="button"
    {...pressableProps}
  >
    <Text style={[styles.text, primary && styles.textPrimary]}>{children}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignSelf: 'stretch'
  },
  pressed: {
    backgroundColor: '#dddddd'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  primary: {
    backgroundColor: '#000000'
  },
  textPrimary: {
    color: '#ffffff'
  },
})
