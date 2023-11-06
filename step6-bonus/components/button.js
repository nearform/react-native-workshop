import { Pressable, StyleSheet, Text } from 'react-native'

export const Button = ({ children, ...pressableProps }) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    accessibilityRole="button"
    {...pressableProps}
  >
    <Text style={styles.text}>{children}</Text>
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
})
