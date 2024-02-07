import { ScrollView, Text, StyleSheet, Linking } from 'react-native'
import { Button } from '../components/button'

export const About = () => (
  <ScrollView contentContainerStyle={styles.container} style={styles.outer}>
    <Text style={styles.text}>This game was created in the NodeConf EU React Native workshop.</Text>
    <Text style={styles.text}>Tilt your device to roll the ball into the randomly-placed goals.</Text>
    <Text style={styles.text}>Find out more:</Text>
    <Button accessibilityRole="link" onPress={() => Linking.openURL('https://github.com/nearform/react-native-workshop')}>
      Workshop on GitHub
    </Button>
    <Button accessibilityRole="link" onPress={() => Linking.openURL('https://www.nodeconf.eu/')}>
      nodeconf.eu
    </Button>
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