import { StackNavigator } from 'react-navigation';
import { Home } from 'src/components/Pages/Home';
import { JobDetails } from 'src/components/Pages/JobDetails';

export const Navigator = StackNavigator({
  Home: { screen: Home },
  JobDetails: { screen: JobDetails },
});
