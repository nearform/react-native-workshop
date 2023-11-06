import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/button'

export const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NodeConfGame</Text>
    <View style={styles.buttons}>
      <Button onPress={() => navigation.navigate('Game')}>Play</Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: -3
  },
  buttons: {
    padding: 16,
    gap: 8,
    alignSelf: 'stretch'
  }
})
