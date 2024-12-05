import { StyleSheet } from 'react-native';


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#242529',

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    color: "#e3e553",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#f7f7f7",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#e7e7e7",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#141519",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 2,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 16,
  },
  cardtitle: {
    fontSize: 16,
    color: "#e3e553",
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#e3e553',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    
  },
  buttonText: {
    fontSize: 16,
    color: '#242529',
    fontWeight: 'bold',
  },
  empty: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export const chartStyles = {
  chartConfig: {
    backgroundColor: '#242529',
    backgroundGradientFrom: '#141519',
    backgroundGradientTo: '#141519',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },

  legendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#FFF',
  },
};
