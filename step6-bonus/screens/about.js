import { ScrollView, Text, StyleSheet } from 'react-native'

export const About = () => (
  <ScrollView contentContainerStyle={styles.container} style={styles.outer}>
    <Text style={styles.text}>This game was created in the NodeConf EU React Native workshop.</Text>
    <Text style={styles.text}>Tilt your device to roll the ball into the randomly-placed goals.</Text>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16
  },
  outer: {
    flex: 1
  },
  text: {
    fontSize: 16
  }
})